
import { HTTP_STATUS_CODE } from "@src/constants/http";
import { ExtendableError } from ".";

export class RepeatedNombreCortoError extends ExtendableError {
  constructor(
    value?: string,
    descriptor?: string,
    statusCode: number = HTTP_STATUS_CODE.ALREADY_EXISTS
  ) {
    super(
      !descriptor ? `That nombre_corto with value ${value} already exists` : descriptor,
      statusCode
    );
  }
}
