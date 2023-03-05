import { IRouter } from "express";

export interface IHTTPRouter {
  get(): IRouter;
}
