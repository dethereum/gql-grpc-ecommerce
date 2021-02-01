import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { cors } from '@tinyhttp/cors';
import { cookieParser } from '@tinyhttp/cookie-parser';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const GRAPHQL_PORT = configService.get<number>('GRAPHQL_PORT');
  const isDev = configService.get<string>('NODE_ENV') == 'development';

  app.use(
    cors({
      origin: '*',
      credentials: isDev,
    }),
  );
  app.use(cookieParser());

  app.useLogger(app.get(Logger));

  await app.listenAsync(GRAPHQL_PORT);

  console.log(
    `[BOOTSTRAP]    click to view playground: http://localhost:${GRAPHQL_PORT}/`,
  );
}

bootstrap();
