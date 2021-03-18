import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';
import { PaginationResponse } from 'src/config/rest/paginationResponse';
import { Crate, Subscription, User } from 'src/database/entities';
import { getArrayPagination } from 'src/shared/Utils';
import { Repository } from 'typeorm';
import { SubscriptionDetails } from './response/subscriptionDetails.dto';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(Subscription)
    private subscriptionsRepository: Repository<Subscription>,

    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @InjectRepository(Crate)
    private cratesRepository: Repository<Crate>,
  ) {}

  async getAllSubscriptions(
    paginationOptions: IPaginationOptions,
  ): Promise<PaginationResponse<SubscriptionDetails>> {
    const subscriptions = await this.subscriptionsRepository.find();
    const { items, meta } = getArrayPagination(subscriptions, paginationOptions);

    const results: SubscriptionDetails[] = await Promise.all(
      items.map(async (subscription: Subscription) => {
        const response: any = subscription;
        const user = await this.usersRepository.findOne({
          id: subscription.userId,
        });
        const crate = await this.cratesRepository.findOne({
          id: subscription.crateId,
        });
        response.user = user;
        response.crate = crate;

        return new SubscriptionDetails(response);
      }),
    );
    return {
      results: results,
      pagination: meta,
    };
  }
}
