import { HTTP_STATUS_CODE } from "@src/constants/http";
import { ExtendableError } from ".";

export class MalformedDataError extends ExtendableError {
  private constructor(
    descriptor?: string,
    statusCode: number = HTTP_STATUS_CODE.MALFORMED_DATA
  ) {
    super(descriptor || "Malformed expected data", statusCode);
  }
  static create(
    descriptor?: string,
    statusCode: number = HTTP_STATUS_CODE.MALFORMED_DATA
  ) {
    const instance = new MalformedDataError(descriptor, statusCode);
    return instance;
  }
}
