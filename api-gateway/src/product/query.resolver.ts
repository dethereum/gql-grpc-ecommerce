import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { PinoLogger, InjectPinoLogger } from 'nestjs-pino';
import type { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import type { GetProductResponse } from '../graphql/typings';
import type { ProductServiceClient } from './_proto/product/product';
import { PRODUCT_SERVICE_NAME } from './_proto/product/product';

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
    const product$ = this.productServiceClient.getProduct({ product_id: productId });

    return product$.pipe(
      map(({ product_value }) => {
        return product_value
          ? {
              productNull: false,
              productValue: {
                productId: product_value.product_id,
                name: product_value.name,
                description: product_value.description,
                price: product_value.price,
                status: product_value.status,
                createdTime: {
                  seconds: product_value.created_time?.seconds,
                  nanos: product_value.created_time?.nanos
                }
              },
            }
          : {
              productNull: true,
            };
      }),
    );
  }
}
