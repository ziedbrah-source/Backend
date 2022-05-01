import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { CameraProductsService } from './camera-products.service';
import { CreateCameraProductDto } from './dto/create-camera-product.dto';
import { UpdateCameraProductDto } from './dto/update-camera-product.dto';

@Controller('camera-products')
export class CameraProductsController {
  constructor(private readonly cameraProductsService: CameraProductsService) {}

  @Post()
  create(@Body() createCameraProductDto: CreateCameraProductDto) {
    return this.cameraProductsService.create(createCameraProductDto);
  }

  @Get()
  findAll() {
    return this.cameraProductsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cameraProductsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCameraProductDto: UpdateCameraProductDto) {
    return this.cameraProductsService.update(+id, updateCameraProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cameraProductsService.remove(+id);
  }
}
