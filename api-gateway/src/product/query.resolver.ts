import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { Args, Query, Resolver, Int } from '@nestjs/graphql';

import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import { map } from 'rxjs/operators';

import { Product } from './models/product.model';
import type { ProductServiceClient } from './_proto/product/product';
import { PRODUCT_SERVICE_NAME } from './_proto/product/product';

@Resolver(() => Product)
export class ProductQueryResolver implements OnModuleInit {
  private productServiceClient!: ProductServiceClient;

  constructor(
    @Inject('ProductGrpcClient')
    private readonly productGrpcClient: ClientGrpcProxy,
    @InjectPinoLogger(ProductQueryResolver.name)
    private readonly logger: PinoLogger,
  ) {}

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
