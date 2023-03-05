import { HTTP_STATUS_CODE } from "@src/constants/http";
import { ExtendableError } from ".";

export class UnauthorizedError extends ExtendableError {
  private constructor(
    descriptor?: string,
    statusCode: number = HTTP_STATUS_CODE.UNAUTHORIZED
  ) {
    super(descriptor || "Unathorized", statusCode);
  }
  static create(
    descriptor?: string,
    statusCode: number = HTTP_STATUS_CODE.UNAUTHORIZED
  ) {
    const instance = new UnauthorizedError(descriptor, statusCode);
    return instance;
  }
}
