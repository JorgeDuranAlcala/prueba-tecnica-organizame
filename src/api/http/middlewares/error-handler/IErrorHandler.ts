/* eslint-disable no-unused-vars */
import { Request, Response, NextFunction } from "express";

export interface IErrorHandler {
  logErrorMiddleware: (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => void;
  returnError: (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
  ) => Response;
  NOT_FOUND_ROUTE_HANDLER: (req: Request, res: Response) => Response;
}
