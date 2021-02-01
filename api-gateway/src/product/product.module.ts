import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LoggerModule } from 'nestjs-pino';
import {
  ClientProxyFactory,
  Transport,
  ClientGrpcProxy,
} from '@nestjs/microservices';

import { ProductQueryResolver } from './query.resolver';

@Module({
  imports: [ConfigModule, LoggerModule],
  providers: [
    ProductQueryResolver,
    {
      provide: 'ProductGrpcClient',
      useFactory: (configService: ConfigService): ClientGrpcProxy => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            url: configService.get<string>('PRODUCT_SVC_URL'),
            package: 'product',
            protoPath: join(__dirname, '../../../protos/product/product.proto'),
            loader: {
              keepCase: true,
              enums: String,
              oneofs: true,
              arrays: true,
            },
          },
        });
      },
      inject: [ConfigService],
    },
  ],
  exports: ['ProductGrpcClient'],
})
export class ProductModule {}
