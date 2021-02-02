import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { cookieParser } from '@tinyhttp/cookie-parser';
import { cors } from '@tinyhttp/cors';
import { Logger } from 'nestjs-pino';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService: ConfigService = app.get(ConfigService);

  const GRAPHQL_PORT = configService.get<number>('GRAPHQL_PORT');
  if (!GRAPHQL_PORT)
    throw new Error('GRAPHQL_PORT is undefined. Set GRAPHQL_PORT env variable');

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

bootstrap().catch((e: unknown) => {
  console.log('There was an error bootstraping the gql server');
  console.error(e);
});
