/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable func-names */
/* eslint-disable max-classes-per-file */
/* eslint-disable prefer-const */
import {
    registerDecorator,
    ValidationOptions,
    validate,
  } from 'class-validator';
  
  import { DateCheck, DateCheckRequired } from './models';
  
  export function IsRequiredCondition(
    property: string,
    validationOptions?: ValidationOptions,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'IsRequiredCondition',
        target: object.constructor,
        propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          async validate(date: any, args: any) {
            if (args.object.allow_final_version_submission) {
              // eslint-disable-next-line prefer-const
              let dateCheckRequired = new DateCheckRequired();
              dateCheckRequired.date = date;
              const errors = await validate(dateCheckRequired);
              return !errors.length;
            }
            if (args.object.allow_final_version_submission !== false && date) {
              const dateCheck = new DateCheck();
              dateCheck.date = date;
              const errors = await validate(dateCheck);
              return !errors.length;
            }
            return true;
          },
        },
      });
    };
  }
  
  export function IsRequiredDateCheckCondition(
    property: string,
    validationOptions?: ValidationOptions,
  ) {
    // eslint-disable-next-line @typescript-eslint/ban-types
    return function (object: Object, propertyName: string) {
      registerDecorator({
        name: 'IsRequiredCondition',
        target: object.constructor,
        propertyName,
        constraints: [property],
        options: validationOptions,
        validator: {
          async validate(date: any, args: any) {
            if (args.object.allow_final_version_submission) {
              let dateCheckRequired = new DateCheckRequired();
              dateCheckRequired.date = date;
              const errors = await validate(dateCheckRequired);
              if (!errors.length) {
                const dateCheck = new DateCheck();
                dateCheck.date = date;
                const errors = await validate(dateCheck);
                return !errors.length;
              }
            }
            return true;
          },
        },
      });
    };
  }