import { HTTP_STATUS_CODE } from "@src/constants/http";
import { ExtendableError } from ".";

export class CategoriaNotFound extends ExtendableError {
  constructor(
    id?: string,
    descriptor?: string,
    statusCode: number = HTTP_STATUS_CODE.NOT_FOUND
  ) {
    super(
      !descriptor ? `Categoria with ${id} could not be found` : descriptor,
      statusCode
    );
  }
}
