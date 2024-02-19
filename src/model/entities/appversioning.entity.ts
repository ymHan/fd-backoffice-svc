import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class AppVersioning extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appName: string;

  @Column()
  version: string;

  @Column()
  description: string;

  @Column()
  platform: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
