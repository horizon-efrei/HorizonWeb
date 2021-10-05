import { createProfiguration } from '@golevelup/profiguration';
import { Logger } from '@nestjs/common';

interface Config {
  port: number;
  nodeEnv: 'development' | 'production' | 'test';
  mongoUri: string;
  frontEndUrl: string;
  accessTokenSecret: string;
  accessTokenExpiration: string;
  refreshTokenSecret: string;
  refreshTokenExpiration: string;
}

const logger = new Logger('Configuration');

export const uploadConfig = {
  allowedDocFiles: ['pdf', 'doc', 'docx', 'xls', 'xlsx', 'csv', 'txt', 'rtf'],
  allowedImgFiles: ['jpg', 'jpeg', 'png', 'gif'],
  allowedVideoFiles: ['wma', 'mpg', 'flv', 'avi'],
  allowedProgFiles: ['c', 'py', 'vue', 'js', 'ts', 'md'],
  allowedSoundFiles: ['mp3', 'wav'],
  allowedArchiveFiles: ['rar', 'zip'],
  convertToPDF: true,
  maxSize: 10_485_760,
  uploadPath: './uploads',
};

export const apiConfig = createProfiguration<Config>({
  port: {
    default: 5000,
    format: Number,
    env: 'PORT',
  },
  nodeEnv: {
    default: 'development',
    format: ['development', 'production', 'test'],
    env: 'NODE_ENV',
  },
  mongoUri: {
    default: 'mongodb://localhost/horizon-db',
    format: String,
    env: 'MONGO_URI',
  },
  frontEndUrl: {
    default: 'http://localhost:8080',
    format: String,
    env: 'FRONTEND_URL',
  },
  accessTokenSecret: {
    default: 'secret',
    format: String,
    env: 'ACCESS_TOKEN_SECRET',
  },
  accessTokenExpiration: {
    default: '3600s',
    format: String,
    env: 'ACCESS_TOKEN_EXPIRATION',
  },
  refreshTokenSecret: {
    default: 'secret',
    format: String,
    env: 'REFRESH_TOKEN_SECRET',
  },
  refreshTokenExpiration: {
    default: '1y',
    format: String,
    env: 'REFRESH_TOKEN_EXPIRATION',
  },
}, {
  strict: true,
  verbose: true,
  logger: (message: string) => {
    logger.log(message.replace(/^@golevelup\/profiguration: /g, ''));
  },
  configureEnv: () => ({ files: '.env' }),
});
