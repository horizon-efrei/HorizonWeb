import { Module } from '@nestjs/common';
import * as Redis from 'redis';
import redisConfig from '../../configs/redis.config';

import { REDIS } from './redis.constants';

@Module({
  providers: [
    {
      provide: REDIS,
      useValue: Redis.createClient(redisConfig),
    },
  ],
  exports: [REDIS],
})
export class RedisModule {}
