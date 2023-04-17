import { BaseEntity } from '../baseEntity';
import { Column, Entity } from 'typeorm';

@Entity('cats')
export class CatsEntity extends BaseEntity {
  @Column({ type: 'character varying', nullable: false })
  name: string;

  @Column({ type: 'int', nullable: false })
  age: number;

  @Column({ type: 'character varying', nullable: false })
  breed: string;
}
