import { BaseEntity, Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class HistoryAppVersion extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appName: string;

  @Column()
  version: string;

  @Column()
  description: string;

  @CreateDateColumn()
  createdAt: Date;
}
