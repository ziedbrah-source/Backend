import { CameraProduct } from 'src/camera-products/entities/camera-product.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TimestampEntity } from '../../generics/timestamp.entity';

export enum UserRoleEnum {
  admin = 'ROLE:ADMIN',
  NormalUser = 'ROLE:USER',
  DeviceOwner = 'ROLE:DEVICEOWNER',
}

@Entity()
export class User extends TimestampEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isActive: boolean;

  @Column()
  role: UserRoleEnum;
  @OneToMany(() => CameraProduct, (CameraProduct) => CameraProduct.user, {
    eager: true,
  })
  cameras: CameraProduct[];
}
