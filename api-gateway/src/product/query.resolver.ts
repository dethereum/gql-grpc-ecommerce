import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import type { GetProductResponse } from '../graphql/typings';
import type { ProductServiceClient } from './_proto/product';
import { PRODUCT_SERVICE_NAME } from './_proto/product';

@Resolver()
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

  @Query('productServiceGetProduct')
  getProduct(
    @Args('productId') productId: number,
  ): Observable<GetProductResponse> {
    const product$ = this.productServiceClient.getProduct({ productId });

    return product$.pipe(
      map(({ product }) => {
        return product && product.$case == 'product_value'
          ? {
              productNull: false,
              productValue: product.product_value,
            }
          : {
              productNull: true,
            };
      }),
    );
  }
}
