import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { LangChainModule } from './langchain/langchain.module.js';
import { ConfigModule } from '@nestjs/config';
import { getEnvFilePath } from './common/helper/env.helper.js';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const file = fileURLToPath(import.meta.url);
const __dirname = dirname(file);

/// fetching the file path of the env
const envPath = getEnvFilePath(`${__dirname}/common/envs`);

@Module({
  imports: [
    LangChainModule,
    ConfigModule.forRoot({ isGlobal: true, envFilePath: envPath }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
