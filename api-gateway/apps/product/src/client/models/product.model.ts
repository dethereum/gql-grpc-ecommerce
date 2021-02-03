import {
  Field,
  Float,
  GraphQLISODateTime,
  Int,
  ObjectType,
} from '@nestjs/graphql';

import { ProductStatus } from './product-status';

@ObjectType('Product')
export class ProductModel {
  @Field(() => Int)
  readonly productId!: number;

  @Field()
  readonly name!: string;

  @Field()
  readonly description!: string;

  @Field(() => Float)
  readonly price!: number;

  @Field(() => ProductStatus)
  readonly status!: ProductStatus;

  @Field(() => GraphQLISODateTime)
  readonly createdTime!: Date;
}
