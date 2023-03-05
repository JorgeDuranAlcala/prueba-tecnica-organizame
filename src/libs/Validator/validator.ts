import { validate, ValidationError } from "class-validator";
import { MalformedDataError } from "../Error/Malformed-data";
import { IValidator } from "./IValidator";

export class Validator implements IValidator {
  static create() {
    return new Validator();
  }

  async validate(data: object): Promise<boolean> {
    const errors = await validate(data);
    if (errors.length > 0)
      throw MalformedDataError.create(this.formatErrorData(errors));
    return true;
  }

  private formatErrorData(errors: ValidationError[]) {
    return "Error: ".concat(
      errors
        .map((error: ValidationError) => Object.values(error.constraints || {}))
        .join(", ")
    );
  }
}
