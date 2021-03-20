import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/database/entities';

export class ProductDetails {
  @ApiProperty({
    type: Number,
    example: 1,
  })
  id: number;

  @ApiProperty({
    type: String,
    example: 'Clothes for men',
  })
  name: string;

  @ApiProperty({
    type: String,
    example: 'clothes-for-men',
  })
  slug: string;

  @ApiProperty({
    type: String,
    example: 'A monthly supply of trendy clothes for men.',
  })
  description: string;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  type: number;

  @ApiProperty({
    type: Number,
    example: 1,
  })
  gender: number;

  @ApiProperty({
    type: String,
    example: '/images/stock/belt-female.jpg',
  })
  image: string;

  @ApiProperty({
    type: Number,
    example: 1587464883336,
  })
  createdAt: number;

  @ApiProperty({
    type: Number,
    example: 1587464883336,
  })
  updatedAt: number;

  constructor(product: Product) {
    (this.id = product.id),
      (this.name = product.name),
      (this.slug = product.slug),
      (this.description = product.description),
      (this.type = product.type),
      (this.gender = product.gender),
      (this.image = product.image),
      (this.createdAt = product.createdAt),
      (this.updatedAt = product.updatedAt);
  }
}
