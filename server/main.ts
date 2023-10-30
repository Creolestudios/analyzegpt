import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    forceCloseConnections: true,
  });

  /// get the confifuration for getting the port
  const config: ConfigService = app.get(ConfigService);

  /// seting global route prefix
  app.setGlobalPrefix('transcript');

  /// enable cross origin resource sharing
  app.enableCors();

  /// get the port
  const port: number = config.get<number>('PORT') || 3000;

  await app.listen(port, () => {
    console.log('[WEB]', config.get<string>('BASE_URL') + port);
  });
}
bootstrap();
