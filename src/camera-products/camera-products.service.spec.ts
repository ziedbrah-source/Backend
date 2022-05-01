import { Test, TestingModule } from '@nestjs/testing';
import { CameraProductsService } from './camera-products.service';

describe('CameraProductsService', () => {
  let service: CameraProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CameraProductsService],
    }).compile();

    service = module.get<CameraProductsService>(CameraProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
