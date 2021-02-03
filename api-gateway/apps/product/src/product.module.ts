import type { GqlModuleOptions } from '@nestjs/graphql';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { LoggerModule, PinoLogger } from 'nestjs-pino';

import { ClientModule } from './client/client.module';
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
        autoSchemaFile: true,
        path: '/',
        subscriptions: '/',
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
    ClientModule,
  ],
})
export class ProductModule {}
