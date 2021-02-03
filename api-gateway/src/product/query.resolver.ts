import type { OnModuleInit } from '@nestjs/common';
import type { Timestamp } from './_proto/google/protobuf/timestamp';
import type { ProductServiceClient } from './_proto/product/product';

import { Inject } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { merge } from 'rxjs';
import { filter, map, mapTo } from 'rxjs/operators';

import { PRODUCT_SERVICE_NAME } from './_proto/product/product';
import { ProductModel } from './models/product.model';

const toDate = (message: Timestamp | undefined) => {
  // @ts-expect-error this was already checked by filter
  return new Date(message.seconds * 1000 + message.nanos / 1000);
};

@Resolver(() => ProductModel)
export class ProductQueryResolver implements OnModuleInit {
  // eslint-disable-next-line functional/prefer-readonly-type
  private client!: ProductServiceClient;

  constructor(
    @Inject('ProductGrpcClient')
    private readonly productGrpcClient: ClientGrpcProxy,

    @InjectPinoLogger('ProductQueryResolver')
    private readonly logger: PinoLogger,
  ) {}

  onModuleInit() {
    // eslint-disable-next-line functional/no-expression-statement, functional/immutable-data
    this.client = this.productGrpcClient.getService<ProductServiceClient>(
      PRODUCT_SERVICE_NAME,
    );
  }

  @Query(() => ProductModel, { name: 'product', nullable: true })
  getProduct(@Args('productId', { type: () => Int }) productId: number) {
    const product$ = this.client.getProduct({ productId });

    const found$ = product$.pipe(
      filter(({ productValue }) => productValue !== undefined),
      map(({ productValue }) => ({
        ...productValue,
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        createdTime: toDate(productValue!.createdTime),
      })),
    );

    const null$ = product$.pipe(
      filter(({ productValue }) => productValue === undefined),
      mapTo(null),
    );

    return merge(found$, null$);
  }
}
