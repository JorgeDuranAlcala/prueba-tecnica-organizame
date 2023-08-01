import { HTTP_STATUS_CODE } from "@src/constants/http";
import { ExtendableError } from "@src/libs/Error";
import { Request, Response, NextFunction } from "express";

export class ErrorHandler {
  private logError = (err: Error) => {
    console.error(new Date(Date.now()), err.message);
  };

  public logErrorMiddleware = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    this.logError(err);
    next(err);
  };

  public returnError = (err: Error, req: Request, res: Response) => {
    if (err instanceof ExtendableError) {
      return res?.status(err.statusCode).send(err.message);
    }
    return res
      ?.status(HTTP_STATUS_CODE.INTERNAL_SERVER_ERROR)
      .send(err.message);
  };

  public NOT_FOUND_ROUTE_HANDLER = (req: Request, res: Response) => {
    return res.status(HTTP_STATUS_CODE.NOT_FOUND).send("Opps. 404 not found");
  };
}
