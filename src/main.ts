import 'reflect-metadata';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';

import { AppModule } from './app.module';

import { DataInterceptor } from '@/common/interceptors/data.interceptor';

import { AppConfigService } from '@/common/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });

  const configService: AppConfigService = app.get(AppConfigService);
  const { port, environment, host, protocol } = configService.appConfig;

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  app.useGlobalInterceptors(new DataInterceptor());

  app.use(helmet());

  const config = new DocumentBuilder()
    .setTitle('Blog Post')
    .setDescription('The Blog Post API description')
    .setVersion('1.0')
    .addTag('blog-post')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);

  Logger.log(
    `App is running on: ${protocol}://${host}:${port}, with the environment of: ${environment}`,
  );
  await app.listen(port);
}
bootstrap();
