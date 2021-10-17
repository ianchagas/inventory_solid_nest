import { AddressEntity } from 'libs/address/src/infra/typeORM/entities/address.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  cpf: number;

  @Column()
  cnpj: number;

  @Column()
  ie: number;

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
