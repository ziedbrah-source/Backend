import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CameraProductsModule } from './camera-products/camera-products.module';
import { User } from './users/entities/user.entity';
import { CameraProduct } from './camera-products/entities/camera-product.entity';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '24934500',
      database: 'attentionproject',
      entities: [User, CameraProduct],
      synchronize: true,
    }),

    CameraProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
