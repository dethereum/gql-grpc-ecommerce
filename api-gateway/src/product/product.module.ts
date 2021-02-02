import type { ClientGrpcProxy } from '@nestjs/microservices';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { LoggerModule } from 'nestjs-pino';
import { join } from 'path';

import { ProductQueryResolver } from './query.resolver';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [
    ProductQueryResolver,
    {
      provide: 'ProductGrpcClient',
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        const options = {
          url: configService.get<string>('PRODUCT_SVC_URL'),
          package: 'product',
          protoPath: join(__dirname, '../../../protos/product/product.proto'),
          loader: {
            keepCase: true,
            enums: String,
            longs: Number,
            oneofs: true,
            arrays: true,
          },
        };

        // eslint-disable-next-line total-functions/no-unsafe-readonly-mutable-assignment
        const productGrpcClient = ClientProxyFactory.create({
          transport: Transport.GRPC,
          options,
        });

        return productGrpcClient;
      },
      inject: [ConfigService],
    },
  ],
  exports: ['ProductGrpcClient'],
})
export class ProductModule {}
