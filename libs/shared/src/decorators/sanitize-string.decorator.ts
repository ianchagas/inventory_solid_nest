/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { registerDecorator, ValidationOptions } from 'class-validator';

export function sanitize(str: string): number {
  return str.replace(/<[^>]*>/g, '').trim().length;
}

export function sanitizeString(
  property: string,
  validationOptions?: ValidationOptions,
) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return (object: Object, propertyName: string) => {
    registerDecorator({
      name: 'sanitizeString',
      target: object.constructor,
      propertyName,
      constraints: [property],
      options: validationOptions,
      validator: {
        validate(str: any) {
          return sanitize(str) <= 5000;
        },
      },
    });
  };
}
