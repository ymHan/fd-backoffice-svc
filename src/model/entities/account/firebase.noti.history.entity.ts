import { IsEmail } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { UserAccountEntity } from './user-account.entity';
import { ManyToOne, JoinColumn } from 'typeorm';

@Entity({ name: 'firebase_noti_history' })
export class FirebaseNotiHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => UserAccountEntity, (user) => user.notis)
  @JoinColumn({ name: 'userid', referencedColumnName: 'id' })
  user: UserAccountEntity;

  @Column({ type: 'varchar', nullable: true })
  token!: string;

  @Column({ type: 'varchar', nullable: true })
  title!: string;

  @Column({ type: 'varchar', nullable: true })
  body!: string;

  @Column({ type: 'boolean', default: true })
  status: boolean;

  @Column({ type: 'varchar', nullable: true })
  failmessage!: string;

  @Column({ name: 'create_at', type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  create_at: Date;
}
