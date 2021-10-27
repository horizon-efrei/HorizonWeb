import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { apiConfig } from './config';
import { ExceptionsFilter } from './shared/filter/exceptions.filter';
import { logger } from './shared/middlewares/logger';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.use(helmet());
  app.use(logger);
  app.use(cookieParser(apiConfig.get('cookieSignature')));

  app.enableCors({ origin: true, credentials: true });
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe({ transform: true, forbidUnknownValues: true }));
  app.useGlobalFilters(new ExceptionsFilter());
  app.set('trust proxy', false);

  await app.listen(apiConfig.get('port'));
  Logger.log(`Server initialized on port ${apiConfig.get('port')}`, 'Bootstrap');
}

void bootstrap();
