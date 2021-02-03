import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { cookieParser } from '@tinyhttp/cookie-parser';
import { cors } from '@tinyhttp/cors';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  const GRAPHQL_PORT = configService.get<number>('GRAPHQL_PORT') || 8000;

  const isDev = configService.get<string>('NODE_ENV') === 'development';

  /* eslint-disable functional/no-expression-statement */
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

void bootstrap();
/* eslint-enable functional/no-expression-statement */
