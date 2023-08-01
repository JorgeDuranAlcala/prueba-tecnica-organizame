import { HTTP_STATUS_CODE } from "@src/constants/http";
import {
  ClassConstructor,
  plainToInstance,
  instanceToPlain,
} from "class-transformer";
/* eslint-disable no-unused-vars */
import { NextFunction, Response, Request } from "express";

export type ControllerExpressMethod<T> = (
  req: Request,
  res: Response,
  next: NextFunction
) => T;
export type ClrExpressMethodReturnPromiseResVoid = ControllerExpressMethod<
  Promise<Response | void>
>;

export abstract class BaseController {
  public ok(res: Response, result?: Record<string, unknown>) {
    return res.status(HTTP_STATUS_CODE.OK).send(result);
  }

  public bodyParser<T>(
    dtoClass: ClassConstructor<T>,
    body: Record<string, unknown>
  ) {
    const dto = plainToInstance(dtoClass, body, {
      excludeExtraneousValues: true,
      exposeDefaultValues: false,
    });
    return dto;
  }

  public transformToPlainObj<T>(dtoObj: T) {
    return instanceToPlain(dtoObj);
  }
}
