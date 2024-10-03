import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from '../modules/user/user.module';
import { PostModule } from '../modules/post/post.module';
import { PrismaService } from './services/prisma/prisma.service';
import { AuthModule } from '../modules/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes ConfigModule global
      envFilePath: '.env', // Path to your .env file
    }),
    UserModule,
    PostModule,
    AuthModule,
  ], // Add all modules
  controllers: [AppController], // Registers all controller routes
  providers: [AppService, PrismaService], // Register Providers
  exports: [PrismaService], // Service globally
})
export class AppModule {}
