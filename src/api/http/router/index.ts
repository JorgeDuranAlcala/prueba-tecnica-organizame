import { my_productController } from "../controllers/product-controller";
import { HTTPRouter } from "./router";
import { my_categoriaController  } from '../controllers/categoria-controller'
import { userController  } from '../controllers/user-controller'

const router = HTTPRouter.create(
	my_productController, 
	my_categoriaController,
  userController
);

export { router };
