import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { Expo } from 'expo-server-sdk';
import { CameraProductsService } from 'src/camera-products/camera-products.service';
import { UsersService } from 'src/users/users.service';

//import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
    private readonly usersService: UsersService,
    @Inject(forwardRef(() => CameraProductsService))
    private cameraProductService: CameraProductsService,
  ) {}

  async create(createNotificationDto: string) {
    let expo = new Expo();
    let notification = new Notification();
    let splittedNotification = createNotificationDto.split(' ');
    notification.longitude = splittedNotification[0];
    notification.latitude = splittedNotification[1];
    notification.cameraId = splittedNotification[2];
    let messages = [];
    let camera = await this.cameraProductService.findOneById(
      +notification.cameraId,
    );

    if (camera) {
      const user = await this.usersService.findOne(camera.userId);
      // Check that all your push tokens appear to be valid Expo push tokens
      if (user.deviceToken && Expo.isExpoPushToken(user.deviceToken)) {
        messages.push({
          to: user.deviceToken,
          sound: 'default',
          body: 'Camera User is Driving and not giving full attention !',
          data: { withSome: 'data' },
        });
        console.log('notification SENT');
        let chunks = expo.chunkPushNotifications(messages);
        let tickets = [];
        (async () => {
          // Send the chunks to the Expo push notification service. There are
          // different strategies you could use. A simple one is to send one chunk at a
          // time, which nicely spreads the load out over time:
          for (let chunk of chunks) {
            try {
              let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
              console.log(ticketChunk);
              tickets.push(...ticketChunk);
              // NOTE: If a ticket contains an error code in ticket.details.error, you
              // must handle it appropriately. The error codes are listed in the Expo
              // documentation:
              // https://docs.expo.io/push-notifications/sending-notifications/#individual-errors
            } catch (error) {
              console.error(error);
            }
          }
        })();
      }
    }
    return this.notificationRepository.save(notification);
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: number) {
    return this.notificationRepository.findOne(id);
  }

  // update(id: number, updateNotificationDto: UpdateNotificationDto) {
  //   return `This action updates a #${id} notification`;
  // }

  remove(id: number) {
    return `This action removes a #${id} notification`;
  }
}
