import { Module } from '@nestjs/common';
import { CameraProductsService } from './camera-products.service';
import { CameraProductsController } from './camera-products.controller';
import { CameraProduct } from './entities/camera-product.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { NotificationsModule } from 'src/notifications/notifications.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([CameraProduct]),
    UsersModule,
    NotificationsModule,
  ],
  controllers: [CameraProductsController],
  providers: [CameraProductsService],
})
export class CameraProductsModule {}
