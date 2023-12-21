import { Exclude } from 'class-transformer';
import { Entity, Column, BaseEntity, PrimaryColumn } from 'typeorm';

@Entity()
export class Customer extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', nullable: false, length: 4 })
  public id!: string;

  @Column({ type: 'varchar' })
  public name: string;

  @Column({ type: 'varchar', nullable: true })
  public description: string;

  @Column({ type: 'bool', nullable: true })
  public isActivation: boolean;

  @Column({ type: 'bool', nullable: true })
  public isDeleted: boolean;

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
