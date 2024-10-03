/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import { AppModule } from './app/app.module';
//import { JwtAuthGuard } from './modules/auth/jwt-auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';

  //set swagger config
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Api Documentation')
    .setDescription('Example Blog Post Documentation')
    .setVersion('1.0')
    .build();

  // Enable API versioning
  app.enableVersioning({
    type: VersioningType.URI, // Use URI versioning (default option)
  });

  //We'll start by binding ValidationPipe at the application level, thus ensuring all endpoints are protected from receiving incorrect data.
  app.useGlobalPipes(new ValidationPipe());

  // Add Cors
  // Enable global CORS
  app.enableCors({
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    allowedHeaders: 'Content-Type, Authorization', // Specify allowed headers
    exposedHeaders: 'Content-Length, X-Knowledge-Base', // Specify exposed headers
    maxAge: 3600, // Specify how long the results of a preflight request can be cached
  });

  app.setGlobalPrefix(globalPrefix);

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('swagger', app, swaggerDocument);

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`,
  );
}

bootstrap();
