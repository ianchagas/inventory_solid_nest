/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable prefer-const */
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
  validate,
} from 'class-validator';
import { isBefore, parseISO, subHours } from 'date-fns';

import { EmptyCheck, IntervalDateCheck } from './models';

export function IsGreaterThan(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsGreaterThan',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(startDate: any, args: ValidationArguments) {
          const [relatedPropertyName] = args.constraints;
          const endDate = args.object[relatedPropertyName];
          return isBefore(parseISO(startDate), subHours(new Date(endDate), 1));
        },
      },
    });
  };
}
export function IsGreaterThanConditional(
  property: string,
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'IsGreaterThan',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        async validate(startDate: any, args: any) {
          const [relatedPropertyName] = args.constraints;
          const endDate = args.object[relatedPropertyName];
          if (args.object.allow_rebutal === true) {
            let dateCheck = new IntervalDateCheck();
            let emptyCheck = new EmptyCheck();
            dateCheck.startDate = startDate;
            dateCheck.endDate = endDate;
            //
            let errors = await validate(emptyCheck);
            if (!errors) {
              errors = await validate(dateCheck);
              if (!errors) {
                return isBefore(
                  parseISO(startDate),
                  subHours(new Date(endDate), 1),
                );
              }
              return !!errors;
            }
          }
          return true;
        },
      },
    });
  };
}
