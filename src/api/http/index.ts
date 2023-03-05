import { ErrorHandler } from "./middlewares/error-handler";
import { router } from "./router";
import { ExpressApp } from "./server";

const _errorHandler = new ErrorHandler();
const expressServer = ExpressApp.create(router, _errorHandler);

export { expressServer };
