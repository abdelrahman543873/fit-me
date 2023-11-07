import { ValidateIf, ValidationOptions } from 'class-validator';

export function ValidateIfDefined(
  options?: ValidationOptions,
): PropertyDecorator {
  return function IsNullableDecorator(
    prototype: object,
    propertyKey: string | symbol,
  ) {
    ValidateIf((obj) => obj.hasOwnProperty(propertyKey), options)(
      prototype,
      propertyKey,
    );
  };
}
