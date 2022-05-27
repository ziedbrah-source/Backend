import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateCameraProductDto } from './dto/create-camera-product.dto';
import { UpdateCameraProductDto } from './dto/update-camera-product.dto';
import { ConsumeMessage } from 'amqplib';
import { InjectRepository } from '@nestjs/typeorm';
import { CameraProduct } from './entities/camera-product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
@Injectable()
export class CameraProductsService {
  constructor(
    @InjectRepository(CameraProduct)
    private cameraRepository: Repository<CameraProduct>,
    private readonly usersService: UsersService,
  ) {}
  async create(
    createCameraProductDto: CreateCameraProductDto,
    user: User = null,
  ) {
    let camera = new CameraProduct();
    console.log(user);
    if (user.email) {
      camera.user = await this.usersService.getUserByEmail(user.email);
    }
    try {
      return await this.cameraRepository.save(camera);
    } catch (e) {
      console.log(e);
      throw new InternalServerErrorException();
    }
  }
  async getAllCamerasByUserId(user: User = null) {
    return await this.cameraRepository.find({ where: [{ userId: user.id }] });
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
