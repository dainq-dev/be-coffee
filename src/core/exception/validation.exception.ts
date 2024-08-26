/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/indent */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ValidationError } from 'class-validator';

export function validationExceptionFactory(errors: ValidationError[]) {
  const mapValidationErrors = (errors: ValidationError[]) => {
    let result = [];

    errors.forEach((error: ValidationError) => {
      if (error.constraints) {
        result.push({
          field: error.property,
          constraints: Object.values(error.constraints)[0],
        });
      }

      if (error.children && error.children.length > 0) {
        result = result.concat(mapValidationErrors(error.children));
      }
    });

    return result;
  };

  return {
    code: 'validation',
    message: mapValidationErrors(errors),
  };
}
