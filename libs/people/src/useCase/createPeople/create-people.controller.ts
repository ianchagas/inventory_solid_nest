import { Body, Controller, Post } from '@nestjs/common';
import { CreatePeopleDTO } from '@people/people/dto/request/create-people.dto';
import { PeopleEntity } from '@people/people/infra/typeORM/entities/people.entity';

import { CreatePeopleService } from './create-people.service';

@Controller()
export class CreatePeopleController {
  constructor(private createPeopleService: CreatePeopleService) {}
  @Post('/api/melanzane/people/create')
  async handle(
    @Body() createPeopleDTO: CreatePeopleDTO,
  ): Promise<PeopleEntity> {
    return this.createPeopleService.execute({ createPeopleDTO });
  }
}
