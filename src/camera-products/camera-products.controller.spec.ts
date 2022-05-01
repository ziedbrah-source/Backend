import { Test, TestingModule } from '@nestjs/testing';
import { CameraProductsController } from './camera-products.controller';
import { CameraProductsService } from './camera-products.service';

describe('CameraProductsController', () => {
  let controller: CameraProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CameraProductsController],
      providers: [CameraProductsService],
    }).compile();

    controller = module.get<CameraProductsController>(CameraProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
