import { CameraProduct } from 'src/camera-products/entities/camera-product.entity';
import { TimestampEntity } from 'src/generics/timestamp.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
@Entity()
export class Notification extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;
  // I can use the postgis but let's not complicate it.
  @Column()
  longitude: string;

  @Column()
  latitude: string;
  @ManyToOne(() => CameraProduct, (camera) => camera.notifications)
  @JoinColumn({ name: 'cameraId' })
  camera: CameraProduct;
  @Column()
  cameraId: string;
}
