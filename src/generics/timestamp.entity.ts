import { CreateDateColumn, DeleteDateColumn, VersionColumn } from 'typeorm';

export class TimestampEntity {
  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;
  @CreateDateColumn({})
  updatedAt: Date;
  @DeleteDateColumn({})
  deletedAt: Date;
  @VersionColumn()
  version: number;
}
