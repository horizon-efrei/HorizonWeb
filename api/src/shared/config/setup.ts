import fs from 'node:fs/promises';
import path from 'node:path';
import { ClassSerializerInterceptor, Logger, ValidationPipe } from '@nestjs/common';
import type { HttpsOptions } from '@nestjs/common/interfaces/external/https-options.interface';
import { Reflector } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import { ExceptionsFilter } from '../lib/filters/exceptions.filter';
import { TypesenseFilter } from '../lib/filters/typesense.filter';
import { logger as loggerMiddleware } from '../lib/middlewares/logger.middleware';
import { dirExists } from '../lib/utils/dirExists';
import { config } from './config';
import { client } from './typesense.config';

export async function attemptTypesenseConnection(): Promise<void> {
  const typesenseLogger = new Logger('Typesense');
  try {
    await client.health.retrieve();
    typesenseLogger.log('Connection established');
  } catch (err) {
    if (err?.code === 'ECONNREFUSED') {
      config.set('typesenseEnabled', false);
      typesenseLogger.warn('Service not available, disabling');
    } else {
      throw err;
    }
  }
}

export async function getHttpsOptions(): Promise<HttpsOptions | undefined> {
  const logger = new Logger('SSL');
  const secretDirs = path.join(path.resolve('./'), 'secrets');
  if (await dirExists(secretDirs)) {
    logger.log('Found secrets directory, using HTTPS');
    return {
      key: await fs.readFile('secrets/private-key.pem'),
      cert: await fs.readFile('secrets/public-certificate.pem'),
    };
  }

  logger.log('No secrets directory found, using HTTP');
}

export function setupSwagger(app: NestExpressApplication): void {
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Horizon Web API')
    .setDescription('REST API for HorizonWeb')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
}

export function setupApp(app: NestExpressApplication): void {
  app.use(helmet());
  app.use(loggerMiddleware());
  app.use(cookieParser(config.get('cookieSignature')));

  app.enableCors({ origin: true, credentials: true });
  app.enableShutdownHooks();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: { enableImplicitConversion: true },
    forbidNonWhitelisted: true,
    whitelist: true,
  }));
  app.useGlobalFilters(new ExceptionsFilter(), new TypesenseFilter());
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.set('trust proxy', false);
}
