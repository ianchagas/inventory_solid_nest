import { Controller, Get } from '@nestjs/common';
import { PeopleEntity } from '@people/people/infra/typeORM/entities/people.entity';

import { FindAllPeopleWithAddressService } from './find-all-people-with-address.service';

@Controller()
export class FindAllPeopleWithAddressController {
  constructor(
    private findAllPeopleWithAddressService: FindAllPeopleWithAddressService,
  ) {}
  @Get('/api/melanzane/people/find-all-with-address')
  async handle(): Promise<PeopleEntity[]> {
    return this.findAllPeopleWithAddressService.execute();
  }
}
