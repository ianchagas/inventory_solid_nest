import { PeopleEntity } from 'modules/people/src/infra/typeORM/entities/people.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('address')
class AddressEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column('uuid')
  uuid: string;

  @Column()
  id_people: number;

  @Column()
  street: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  uf: string;

  @Column()
  number: number;

  @Column()
  complement: string;

  @Column()
  comments: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @JoinColumn({ name: 'id_people' })
  @ManyToOne(() => PeopleEntity, (peopleentity) => peopleentity.address, {
    onDelete: 'CASCADE',
  })
  address: PeopleEntity;
}

export { AddressEntity };
