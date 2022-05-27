import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CameraProductsModule } from './camera-products/camera-products.module';
import { User } from './users/entities/user.entity';
import { CameraProduct } from './camera-products/entities/camera-product.entity';
import { NotificationsModule } from './notifications/notifications.module';
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
      synchronize: true,
      entities: ['dist/**/*.entity{.ts,.js}'],
      keepConnectionAlive: true,
    }),
    AppModule,
    CameraProductsModule,
    NotificationsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
