import { BadRequestException, ParseUUIDPipeOptions } from '@nestjs/common';

export const uuidOptions = {
  version: '4',
  exceptionFactory: () => {
    return new BadRequestException(
      'Você precisa passar o UUID no params do tipo uuidv4!',
    );
  },
} as ParseUUIDPipeOptions;