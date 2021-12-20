/* eslint-disable consistent-return */
/* eslint-disable no-useless-return */
import { QueryUnDTO } from 'libs/unit-of-measurement/src/dto/request/query-un.dto';
import { UnitOfMeasurementDTO } from 'libs/unit-of-measurement/src/dto/request/unit-of-measurement.dto';
import { IUnitOfMeasurementRepository } from 'libs/unit-of-measurement/src/implementations/unit-of-measurement.interface';
import { Repository, UpdateResult } from 'typeorm';

import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { UnitOfMeasurementEntity } from '../entities/unit-of-measurement.entity';

@Injectable()
class UnitOfMeasurementRepository implements IUnitOfMeasurementRepository {
  constructor(
    @InjectRepository(UnitOfMeasurementEntity)
    private unitOfMeasurementRepository: Repository<UnitOfMeasurementEntity>,
  ) {}

  async create(
    createUnitOfMeasurementDTO: UnitOfMeasurementDTO,
  ): Promise<UnitOfMeasurementEntity> {
    const CreateUn = this.unitOfMeasurementRepository.create(
      createUnitOfMeasurementDTO,
    );

    const CreatedUn = await this.unitOfMeasurementRepository.save(CreateUn);

    return CreatedUn;
  }

  async findUnByUUID(uuid: string): Promise<UnitOfMeasurementEntity> {
    try {
      const FindUnByUUID = await this.unitOfMeasurementRepository.findOne({
        where: {
          uuid,
        },
      });

      return FindUnByUUID;
    } catch (Error) {
      throw new NotFoundException('Unidade de Medidade não encontrada');
    }
  }

  async findAll(): Promise<UnitOfMeasurementEntity[]> {
    return this.unitOfMeasurementRepository.find();
  }

  async findUnByQuery({
    id,
    uuid,
    description,
    initials,
  }: QueryUnDTO): Promise<UnitOfMeasurementEntity[]> {
    try {
      const FindWithQueryParams =
        this.unitOfMeasurementRepository.createQueryBuilder(
          'unit_of_measurement',
        );
      if (id) {
        FindWithQueryParams.where('unit_of_measurement.id = :id', { id });
      }

      if (uuid) {
        FindWithQueryParams.where('unit_of_measurement.uuid = :uuid', { uuid });
      }

      if (description) {
        FindWithQueryParams.where(
          'unit_of_measurement.description like :description',
          {
            description: `%${description}%`,
          },
        );
      }

      if (initials) {
        FindWithQueryParams.where(
          'unit_of_measurement.initials like :initials',
          {
            initials: `%${initials}%`,
          },
        );
      }

      const FiltersUn = await FindWithQueryParams.getMany();
      return FiltersUn;
    } catch (Error) {
      throw new BadRequestException('Parametro passado é inválido');
    }
  }

  async update({
    uuid,
    description,
    initials,
  }: UnitOfMeasurementDTO): Promise<UpdateResult> {
    const UpdateUn = this.unitOfMeasurementRepository.create({
      description,
      initials,
    });

    const Update = await this.unitOfMeasurementRepository
      .createQueryBuilder()
      .update(UpdateUn)
      .where({ uuid })
      .returning(['uuid', 'description', 'initials'])
      .execute();

    return Update;
  }

  async delete(id: number): Promise<void> {
    try {
      const DeleteUn = await this.unitOfMeasurementRepository.delete({ id });
      const { affected } = DeleteUn;

      if (affected === 0) {
        throw new NotFoundException(
          'Não é possível excluir. Unidade de Medida não existe',
        );
      }
    } catch (Error) {
      throw new NotFoundException(
        'Não é possível excluir. Unidade de Medida não existe',
      );
    }
  }

  async findById(id: number): Promise<UnitOfMeasurementEntity> {
    const FindUnById = this.unitOfMeasurementRepository.findOne(id);
    return FindUnById;
  }
}

export { UnitOfMeasurementRepository };
