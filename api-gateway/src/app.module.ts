import { join } from 'path';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule, GqlModuleOptions } from '@nestjs/graphql';

import { LoggerModule, PinoLogger } from 'nestjs-pino';
@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        pinoHttp: {
          safe: true,
          prettyPrint: configService.get<string>('NODE_ENV') !== 'production',
        },
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRootAsync({
      imports: [LoggerModule],
      useFactory: async (logger: PinoLogger): Promise<GqlModuleOptions> => ({
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
        context: ({ req, res }): any => ({ req, res }),
      }),
      inject: [PinoLogger],
    }),
  ],
})
export class AppModule {}
