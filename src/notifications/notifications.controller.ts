import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';
import { CreateNotificationDto } from './dto/create-notification.dto';
@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @MessagePattern('createNotification')
  create(@Payload() createNotificationDto: string) {
    // we can make a post request to the main server to get the token , but what if the main server is down, that was the main reason that we user Rabbitmq
    // so we will use the camera id for the moment, and we will have another way soon to make it more secure.
    console.log(createNotificationDto);
    let splittedNotification = createNotificationDto;
    return this.notificationsService.create(createNotificationDto);
  }

  @MessagePattern('findAllNotifications')
  findAll() {
    return this.notificationsService.findAll();
  }

  @MessagePattern('findOneNotification')
  findOne(@Payload() id: number) {
    return this.notificationsService.findOne(id);
  }

  // @MessagePattern('updateNotification')
  // update(@Payload() updateNotificationDto: UpdateNotificationDto) {
  //   return this.notificationsService.update(
  //     updateNotificationDto.id,
  //     updateNotificationDto,
  //   );
  // }

  @MessagePattern('removeNotification')
  remove(@Payload() id: number) {
    return this.notificationsService.remove(id);
  }
}
