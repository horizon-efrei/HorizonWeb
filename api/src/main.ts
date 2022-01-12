import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { config } from './shared/config/config';
import {
  attemptTypesenseConnection,
  getHttpsOptions,
  setupApp,
  setupSwagger,
} from './shared/config/setup';

const logger = new Logger('Bootstrap');

async function bootstrap(): Promise<void> {
  await attemptTypesenseConnection();

  const httpsOptions = config.get('nodeEnv') === 'production' ? await getHttpsOptions() : {};
  const app = await NestFactory.create<NestExpressApplication>(AppModule, { httpsOptions });

  setupApp(app);
  setupSwagger(app);

  await app.listen(config.get('port'));
  const url = await app.getUrl();
  logger.log(`API running on: ${url.replace('[::1]', 'localhost')}`);
}

void bootstrap();
