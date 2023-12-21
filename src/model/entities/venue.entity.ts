import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryColumn, BaseEntity } from 'typeorm';

@Entity()
export class Venue extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', length: 3 })
  id: string;

  @Column()
  customerId: string;

  @Column()
  sportsId: string;

  @Column()
  countryId: number;

  @Column()
  stateId: number;

  @Column()
  cityId: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'bool', nullable: false, default: false })
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
