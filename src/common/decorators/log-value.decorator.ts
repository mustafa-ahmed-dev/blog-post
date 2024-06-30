import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function LogValue(
  type: 'before' | 'after',
  validationOptions?: ValidationOptions,
) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'logValue',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: {
        validate(value: any, args: ValidationArguments) {
          console.log(`${type} validation (${propertyName}):`, value);
          // This validator does nothing itself, it just logs
          return true;
        },
      },
    });
  };
}
