import { CameraProduct } from 'src/camera-products/entities/camera-product.entity';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Notification {
  @PrimaryGeneratedColumn()
  id: string;
  @ManyToOne(() => CameraProduct, (camera) => camera.notifications)
  camera: CameraProduct;
}
