import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule, GqlModuleOptions } from '@nestjs/graphql';

import { LoggerModule, PinoLogger } from 'nestjs-pino';

import { ProductModule } from './product/product.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        pinoHttp: {
          safe: true,
          prettyPrint: configService.get<string>('NODE_ENV') !== 'production',
        },
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      imports: [LoggerModule],
      useFactory: (logger: PinoLogger): GqlModuleOptions => ({
        path: '/',
        subscriptions: '/',
        typePaths: ['./**/*.graphql'],
        definitions: {
          path: join(__dirname, 'graphql.ts'),
        },
        logger,
        debug: true,
        cors: false,
        installSubscriptionHandlers: true,
        playground: {
          endpoint: '/',
          subscriptionEndpoint: '/',
          settings: {
            'request.credentials': 'include',
          },
          tabs: [
            {
              name: 'GraphQL API',
              endpoint: '/',
            },
          ],
        },
      }),
      inject: [PinoLogger],
    }),
    ProductModule,
  ],
})
export class AppModule {}
