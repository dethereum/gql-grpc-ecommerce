import type { OnModuleInit } from '@nestjs/common';
import type { ProductServiceClient } from './_proto/product/product';

import { Inject } from '@nestjs/common';
import { Args, Int, Query, Resolver } from '@nestjs/graphql';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { PinoLogger } from 'nestjs-pino';
import { map } from 'rxjs/operators';

import { PRODUCT_SERVICE_NAME } from './_proto/product/product';
import { Product } from './models/product.model';

@Resolver(() => Product)
export class ProductQueryResolver implements OnModuleInit {
  private productServiceClient!: ProductServiceClient;

  constructor(
    @Inject('ProductGrpcClient')
    private readonly productGrpcClient: ClientGrpcProxy,
    private readonly logger: PinoLogger,
  ) {
    logger.setContext(ProductQueryResolver.name);
  }

  onModuleInit(): void {
    this.productServiceClient = this.productGrpcClient.getService<ProductServiceClient>(
      PRODUCT_SERVICE_NAME,
    );
  }

  @Query(() => Product, { name: 'product', nullable: true })
  getProduct(@Args('productId', { type: () => Int }) productId: number) {
    const product$ = this.productServiceClient.getProduct({
      product_id: productId,
    });

    return product$.pipe(
      map(({ product_value }) => {
        return product_value
          ? {
              name: product_value.name,
              description: product_value.description,
              price: product_value.price,
              status: product_value.status,
              productId: product_value.product_id,
              createdTime: {
                ...product_value.created_time,
              },
            }
          : null;
      }),
    );
  }
}
