import { PartialType } from '@nestjs/mapped-types';
import { CreateCameraProductDto } from './create-camera-product.dto';

export class UpdateCameraProductDto extends PartialType(CreateCameraProductDto) {}
