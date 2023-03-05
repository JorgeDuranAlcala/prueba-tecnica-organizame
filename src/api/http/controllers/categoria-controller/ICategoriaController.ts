import { ClrExpressMethodReturnPromiseResVoid  } from '../base-controller'

export interface ICategoriaController {
  createNewCategoria: ClrExpressMethodReturnPromiseResVoid;
  getCategoriaById: ClrExpressMethodReturnPromiseResVoid;
  updateCategoria: ClrExpressMethodReturnPromiseResVoid;
  removeCategoria: ClrExpressMethodReturnPromiseResVoid;
	getCategorias: ClrExpressMethodReturnPromiseResVoid;
  searchCategoria: ClrExpressMethodReturnPromiseResVoid;
}
