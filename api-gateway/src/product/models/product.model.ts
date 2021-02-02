import {
  Field,
  Int,
  ObjectType,
  GraphQLISODateTime,
  Float,
} from '@nestjs/graphql';
import { ProductStatus } from './product-status';

@ObjectType()
export class Product {
  @Field(() => Int)
  productId!: number;

  @Field()
  name!: string;

  @Field()
  description!: string;

  @Field(() => Float)
  price!: number;

  @Field(() => ProductStatus)
  status!: ProductStatus;

  @Field(() => GraphQLISODateTime)
  createdTime!: Date;
}
