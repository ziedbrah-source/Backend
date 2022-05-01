import { Injectable } from '@nestjs/common';
import { CreateCameraProductDto } from './dto/create-camera-product.dto';
import { UpdateCameraProductDto } from './dto/update-camera-product.dto';

@Injectable()
export class CameraProductsService {
  create(createCameraProductDto: CreateCameraProductDto) {
    return 'This action adds a new cameraProduct';
  }

  findAll() {
    return `This action returns all cameraProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} cameraProduct`;
  }

  update(id: number, updateCameraProductDto: UpdateCameraProductDto) {
    return `This action updates a #${id} cameraProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} cameraProduct`;
  }
}
