import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { AddressEntity } from '@address/address/infra/typeORM/entities/address.entity';

@Entity('people')
class PeopleEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  uuid: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  cpf: string;

  @Column()
  cnpj: string;

  @Column()
  ie: string;

  @Column()
  corporate_name: string;

  @Column()
  fantasy_name: string;

  @Column()
  comments: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @OneToMany(() => AddressEntity, (addressentity) => addressentity.address, {
    cascade: ['insert'],
  })
  address: AddressEntity[];
}

export { PeopleEntity };
