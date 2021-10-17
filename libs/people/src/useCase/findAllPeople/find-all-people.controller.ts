import { Controller, Get } from '@nestjs/common';
import { PeopleEntity } from '@people/people/infra/typeORM/entities/people.entity';

import { FindAllPeopleService } from './find-all-people.service';

@Controller()
export class FindAllPeopleController {
  constructor(private findAllPeopleService: FindAllPeopleService) {}
  @Get('/api/melanzane/people/find-all')
  async handle(): Promise<PeopleEntity[]> {
    return this.findAllPeopleService.execute();
  }
}
