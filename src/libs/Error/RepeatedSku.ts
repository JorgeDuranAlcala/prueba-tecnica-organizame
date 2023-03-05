import { HTTP_STATUS_CODE } from "@src/constants/http";
import { ExtendableError } from ".";

export class RepeatedSkuError extends ExtendableError {
  constructor(
    value?: string,
    descriptor?: string,
    statusCode: number = HTTP_STATUS_CODE.ALREADY_EXISTS
  ) {
    super(
      !descriptor ? `Sku with value ${value} already exists` : descriptor,
      statusCode
    );
  }
}
