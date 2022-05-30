import { RabbitSubscribe } from '@golevelup/nestjs-rabbitmq';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateCameraProductDto } from './dto/create-camera-product.dto';
import { UpdateCameraProductDto } from './dto/update-camera-product.dto';
import { ConsumeMessage } from 'amqplib';
import { InjectRepository } from '@nestjs/typeorm';
import { CameraProduct } from './entities/camera-product.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';
import { NotificationsService } from 'src/notifications/notifications.service';
import { NotFoundError } from 'rxjs';
@Injectable()
export class CameraProductsService {
  constructor(
    @InjectRepository(CameraProduct)
    private cameraRepository: Repository<CameraProduct>,
    private readonly notificationsServer: NotificationsService,
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

  async getNotificationById(id: number, user: User = null) {
    const notification = await this.notificationsServer.findOne(id);
    if (notification) {
      const camera = await this.findOne(+notification.cameraId, user);
      if (camera) {
        return notification;
      } else {
        throw new NotFoundException('No Notification By this Id');
      }
    } else {
      throw new NotFoundException('No Notification By this Id');
    }
  }

  async findOne(id: number, user: User) {
    const camera = await this.cameraRepository.findOne({ where: [{ id: id }] });
    if (camera.userId === user.id) {
      return camera;
    } else {
      throw new UnauthorizedException("You can't access this ressource.");
    }
  }

  remove(id: number) {
    return `This action removes a #${id} cameraProduct`;
  }
}
