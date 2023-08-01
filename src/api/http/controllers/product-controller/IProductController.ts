import { ClrExpressMethodReturnPromiseResVoid } from "../base-controller";

export interface IProductController {
  createNewProduct: ClrExpressMethodReturnPromiseResVoid;
  getProductById: ClrExpressMethodReturnPromiseResVoid;
  updateProduct: ClrExpressMethodReturnPromiseResVoid;
  removeProduct: ClrExpressMethodReturnPromiseResVoid;
  getProducts: ClrExpressMethodReturnPromiseResVoid;
  exportProducts: ClrExpressMethodReturnPromiseResVoid;
  searchProducts: ClrExpressMethodReturnPromiseResVoid;
}
