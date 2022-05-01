import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';
@Entity()
export class CameraProduct extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;
}
