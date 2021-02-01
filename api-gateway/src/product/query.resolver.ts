import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpcProxy } from '@nestjs/microservices';
import { Args, Query, Resolver } from '@nestjs/graphql';

import { PinoLogger } from 'nestjs-pino';

import type { ProductServiceClient, GetProductRequest } from './_proto/product';
import { PRODUCT_SERVICE_NAME } from './_proto/product';

@Resolver()
export class ProductQueryResolver implements OnModuleInit {
  private productServiceClient: ProductServiceClient;

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

  @Query('productServiceGetProduct')
  async getProduct(@Args('productId') productId: number) {
    const { product_null, product_value } = await this.productServiceClient
      .getProduct({ productId })
      .toPromise();

    return product_null ? {productNull: true} : {productNull: false, productValue: product_value }
  }
}
