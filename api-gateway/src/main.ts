import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { cors } from '@tinyhttp/cors';
import { cookieParser } from '@tinyhttp/cookie-parser';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const isDev = configService.get<string>('NODE_ENV') == 'development';

  app.use(
    cors({
      origin: '*',
      credentials: isDev,
    }),
  );
  app.use(cookieParser());

  app.useLogger(app.get(Logger));

  return app.listenAsync(configService.get<number>('GRAPHQL_PORT'));
}

bootstrap();
