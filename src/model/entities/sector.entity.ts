import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class Sector extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 3 })
  id: string;

  @Column()
  venueId: string;

  @Column()
  customerId: string;

  @Column()
  name: string;

  @Column({ type: 'varchar', nullable: true })
  latitude: string;

  @Column({ type: 'varchar', nullable: true })
  longitude: string;

  @Column()
  description: string;

  @Column({ type: 'boolean', nullable: true })
  isDeleted: boolean;

  @Exclude()
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  public createdAt: Date;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  public updatedAt: Date;

  @Exclude()
  @Column({ type: 'timestamp', nullable: true })
  public deletedAt: Date;
}
