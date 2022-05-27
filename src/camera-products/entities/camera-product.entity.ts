import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';
import { User } from 'src/users/entities/user.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
//docs : https://typeorm.io/many-to-one-one-to-many-relations
@Entity()
export class CameraProduct extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @ManyToOne(() => User, (user) => user.cameras, { nullable: false })
  @JoinColumn({ name: 'userId' })
  user: User;
  @Column()
  userId: string;
  @OneToMany(() => Notification, (notification) => notification.camera, {
    eager: true,
    nullable: true,
  })
  notifications: Notification[];
}
