import express, { Application } from "express";
import { IErrorHandler } from "./middlewares/error-handler/IErrorHandler";
import Compression from "compression";
import helmet from 'helmet'
import { createServer } from "http";
import { HTTPRouter } from "./router/router";
import dotenv from "dotenv";
dotenv.config();

interface IApp {
  start(): void;
}

export class ExpressApp implements IApp {
  private readonly _app: Application;
  private readonly _router: HTTPRouter;
  private readonly _errorHandler: IErrorHandler;

  private constructor(_router: HTTPRouter, _errorHandler: IErrorHandler) {
    this._router = _router;
    this._errorHandler = _errorHandler;
    this._app = express();
    this.settings();
    this.middlewares();
    this.initRoutes();
  }

  public static create(_router: HTTPRouter, _errorHandler: IErrorHandler) {
    const instance = new ExpressApp(_router, _errorHandler);
    return instance;
  }

  public start() {
    const port = this._app.get("port");
    const httpServer = createServer(this._app);
    httpServer.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  }

  private settings(): void {
    this._app.set("port", process.env.PORT || 4000);
    this._app.set("api-version", process.env.API_VERSION || "beta");
  }

  private middlewares(): void {
    this._app.use(Compression());
		this._app.use(helmet())
    this._app.use(express.json({ limit: "5mb" }));
  }

  private initRoutes(): void {
    const router = this._router.get();
    this._app.use(`/api/v${this._app.get("api-version")}`, router);
    this._app.use("*", this._errorHandler.NOT_FOUND_ROUTE_HANDLER);
		if (process.env.NODE_ENV === "dev") this._app.use(this._errorHandler.logErrorMiddleware);
    this._app.use(this._errorHandler.returnError);
  }

  public get app(): Application {
    return this._app;
  }
}
