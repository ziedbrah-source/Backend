import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';
import { User } from 'src/users/entities/user.entity';
//docs : https://typeorm.io/many-to-one-one-to-many-relations
@Entity()
export class CameraProduct extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;
  @ManyToOne(() => User, (user) => user.cameras)
  user: User;
}
