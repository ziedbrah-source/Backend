import { Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';
import { User } from 'src/users/entities/user.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
//docs : https://typeorm.io/many-to-one-one-to-many-relations
@Entity()
export class CameraProduct extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @ManyToOne(() => User, (user) => user.cameras)
  user: User;
  @OneToMany(() => Notification, (notification) => notification.camera, {
    eager: true,
  })
  notifications: Notification[];
}
