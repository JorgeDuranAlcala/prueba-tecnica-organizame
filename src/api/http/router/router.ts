import { IRouter, Router } from "express";
import { IHTTPRouter } from "./IRouter";
import { IProductController } from "../controllers/product-controller/IProductController";
import { ICategoriaController } from "@src/api/http/controllers/categoria-controller/ICategoriaController";
import { IUserController } from "../controllers/user-controller/IUserController";

export class HTTPRouter implements IHTTPRouter {
  private readonly _router;
  private readonly _product_controller: IProductController;
  private readonly _categoria_controller: ICategoriaController;
  private readonly _user_controller: IUserController;

  private constructor(
    _product_controller: IProductController,
    _categoria_controller: ICategoriaController,
    _user_controller: IUserController
  ) {
    this._router = Router();
    this._product_controller = _product_controller;
    this._categoria_controller = _categoria_controller;
    this._user_controller = _user_controller;
  }

  static create(
    _product_controller: IProductController,
    _categoria_controller: ICategoriaController,
    _user_controller: IUserController
  ) {
    const instance = new HTTPRouter(
      _product_controller,
      _categoria_controller,
      _user_controller
    );
    return instance;
  }

  get(): IRouter {
    this._router
      .route("/product/:id")
      .get(this._product_controller.getProductById)
      .put(this._product_controller.updateProduct)
      .delete(this._product_controller.removeProduct);

    this._router
      .route("/product")
      .get(this._product_controller.getProducts)
      .post(this._product_controller.createNewProduct);

    this._router.get("/productExport", this._product_controller.exportProducts);

    this._router.get("/productSearch", this._product_controller.searchProducts);

    this._router
      .route("/categoria/:id")
      .get(this._categoria_controller.getCategoriaById)
      .put(this._categoria_controller.updateCategoria)
      .delete(this._categoria_controller.removeCategoria);

    this._router
      .route("/categoria")
      .get(this._categoria_controller.getCategorias)
      .post(this._categoria_controller.createNewCategoria);

    this._router
      .route("/searchCategoria")
      .get(this._categoria_controller.searchCategoria);

    this._router.post("/auth/login", this._user_controller.login);

    return this._router;
  }
}
