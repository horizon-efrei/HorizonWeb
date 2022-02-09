import type { createClient } from 'redis';
import { config } from './config';

type RedisOptions = Parameters<typeof createClient>[0];

export default {
  url: config.get('redis.url'),
} as RedisOptions;
