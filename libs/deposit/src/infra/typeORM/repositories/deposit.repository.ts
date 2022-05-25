/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
import { Repository, UpdateResult } from 'typeorm';

import { DepositDTO } from '@deposit/deposit/dto/request/deposit.dto';
import { QueryDepositDTO } from '@deposit/deposit/dto/request/query-deposit.dto';
import { IDepositRepository } from '@deposit/deposit/implementations/deposit.interface';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { DepositEntity } from '../entities/deposit.entity';

@Injectable()
class DepositRepository implements IDepositRepository {
  constructor(
    @InjectRepository(DepositEntity)
    private depositRepository: Repository<DepositEntity>,
  ) {}

  async create(createDepositDTO: DepositDTO): Promise<DepositEntity> {
    const CreateDeposit = this.depositRepository.create(createDepositDTO);
    const CreatedDeposit = await this.depositRepository.save(CreateDeposit);

    return CreatedDeposit;
  }

  async findDepositByUUID(uuid: string): Promise<DepositEntity> {
    try {
      const FindDepositById = await this.depositRepository.findOne({
        where: {
          uuid,
        },
      });

      return FindDepositById;
    } catch (Error) {
      throw new NotFoundException('Deposito não encontrado');
    }
  }

  async update({ uuid, name }: DepositDTO): Promise<UpdateResult> {
    const UpdateDeposit = this.depositRepository.create({
      name,
    });

    const Update = await this.depositRepository
      .createQueryBuilder()
      .update(UpdateDeposit)
      .where({ uuid })
      .returning(['uuid', 'name'])
      .execute();

    return Update;
  }

  async delete(id: number): Promise<void> {
    try {
      const DeleteDeposit = await this.depositRepository.delete({ id });
      const { affected } = DeleteDeposit;

      if (affected === 0) {
        throw new NotFoundException(
          'Não é possível excluir. Deposito não encontrado.',
        );
      }
    } catch (Error) {
      throw new NotFoundException(
        'Não é possível excluir. Deposito não encontrado.',
      );
    }
  }

  async findAll(): Promise<DepositEntity[]> {
    return this.depositRepository.find();
  }

  async findDepositByQuery({
    id,
    uuid,
    name,
  }: QueryDepositDTO): Promise<DepositEntity[]> {
    try {
      const FindWithQueryParams =
        this.depositRepository.createQueryBuilder('deposit');
      if (id) {
        FindWithQueryParams.where('deposit.id = :id', { id });
      }

      if (uuid) {
        FindWithQueryParams.where('deposit.uuid = :uuid', { uuid });
      }

      if (name) {
        FindWithQueryParams.where('deposit.name like :name', {
          name: `%${name}%`,
        });
      }

      const FiltersDeposit = await FindWithQueryParams.getMany();
      return FiltersDeposit;
    } catch (Error) {
      throw new BadRequestException('Parametro passado é inválido');
    }
  }

  async findById(id: number): Promise<DepositEntity> {
    const FindDepositById = this.depositRepository.findOne({
      where: {
        id,
      },
    });
    return FindDepositById;
  }
}

export { DepositRepository };
