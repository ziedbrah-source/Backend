import { Module } from '@nestjs/common';
import { CameraProductsService } from './camera-products.service';
import { CameraProductsController } from './camera-products.controller';
@Module({
  controllers: [CameraProductsController],
  providers: [CameraProductsService],
})
export class CameraProductsModule {}
