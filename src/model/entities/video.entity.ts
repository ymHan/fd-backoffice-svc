import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';
import { Category, CategorySubEnum, CategorySubCodeEnum, RecordType } from '@model/enum';
@Entity()
export class Video extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  title: string;

  @Column()
  subTitle: string;

  @Column()
  description: string;

  @Column()
  ownerName: string;

  @Column()
  ownerNickName: string;

  @Column()
  ownerChannelName: string;

  @Column()
  ownerProfileIconUrl: string;

  @Column()
  thumbnailUrl: string;

  @Column({ default: 0 })
  viewCount: number;

  @Column({ default: 0 })
  reportCount: number;

  @Column({ default: 0 })
  likesCount: number;

  @Column()
  duration: string;

  @Column()
  category: Category;

  @Column()
  categorySub: CategorySubEnum;

  @Column()
  categorySubCode: CategorySubCodeEnum;

  @Column()
  recordType: RecordType;

  @Column('text', { array: true, nullable: true })
  contentUrlList: string[] | null;

  @Column('text', { array: true, nullable: true })
  poseIndicatorList: string[] | null;

  @Column()
  nodeId: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  created_at: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  updated_at: string;

  @Column({ type: 'timestamp with time zone', default: () => 'CURRENT_TIMESTAMP' })
  deleted_at: string;
}
