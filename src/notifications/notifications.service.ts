import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
//import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  create(createNotificationDto: string) {
    let notification = new Notification();
    let splittedNotification = createNotificationDto.split(' ');
    notification.longitude = splittedNotification[0];
    notification.latitude = splittedNotification[1];
    notification.cameraId = splittedNotification[2];

    return this.notificationRepository.save(notification);
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return `This action returns a #${id} notification`;
  }

  // update(id: number, updateNotificationDto: UpdateNotificationDto) {
  //   return `This action updates a #${id} notification`;
  // }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
