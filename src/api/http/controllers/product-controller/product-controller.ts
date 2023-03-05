import { IProductService } from "@src/application/Services/Product/IProductService";
import { CreateProductDto } from "@src/domain/Product/dtos/createProductDTO";
import { UpdateProductDto } from "@src/domain/Product/dtos/updateProductDTO";
import { IValidator } from "@src/libs/Validator/IValidator";
import { ICsvConverter  } from "@src/libs/csv-converter/ICsvConverter"
import { NextFunction, Request, Response } from "express";
import { BaseController } from "../base-controller";
import { IProductController } from "./IProductController";
import { RepeatedSkuError  } from '@src/libs/Error/RepeatedSku'
import { MalformedDataError } from "@src/libs/Error/Malformed-data"

export class ProductController
  extends BaseController
  implements IProductController
{
  private readonly _productService: IProductService;
  private readonly _validator: IValidator;
	private readonly _csvConverter: ICsvConverter;

  constructor(
    _productService: IProductService,
    _validator: IValidator,
		_csvConverter: ICsvConverter
  ) {
    super();
    this._validator = _validator;
    this._productService = _productService;
		this._csvConverter = _csvConverter;
  }

  createNewProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const createDto = this.bodyParser(
        CreateProductDto,
        req.body as Record<string, unknown>
      );
      await this._validator.validate(createDto);
      /* should throw error if sku is already taken */
			const products = await this._productService.find({ sku: createDto.sku  })
      if (products.length > 0) throw new RepeatedSkuError(createDto.sku);

      const new_product_data = await this._productService.createProduct(
        createDto
      );
      return this.ok(res, { id: new_product_data.id, product: new_product_data.getProps() });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };

  getProductById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const { id } = req.params;
      const product = await this._productService.getById(id);
      return this.ok(res, { id, product  });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };

  updateProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const { id } = req.params;
		  const updateDto = UpdateProductDto.create({ 
				sku: req.body.sku,
				descripcion: req.body.descripcion,
				nombre_producto: req.body.nombre_producto,
				precio: req.body.precio,
				categoria: req.body.categoria
			})
      const allUndefined = Object.values(updateDto).every(x => !x);
			if (allUndefined) throw MalformedDataError.create(); 
			const propsToUpdate = Object.entries(updateDto).reduce<{[x: string]: unknown}>((acc,[currKey, currValue]) => (
				currValue ? {...acc, [currKey]: currValue} : acc
			), {})
      await this._validator.validate(updateDto);
			console.log(propsToUpdate)
      const updated = await this._productService.updateProduct(id, propsToUpdate);
      console.log("updated xd", updated)
			return this.ok(res, {
				id,
        message: "Content of the product updated correctly",
      });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };

  removeProduct = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const { id } = req.params;
      const removed = await this._productService.remove(id);
      return this.ok(res, { removed, id });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };

	getProducts =  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const products = await this._productService.getAllProducts();			
      return this.ok(res, { products  });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };

	searchProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const q = req.query.q as string;
      const products = await this._productService.search(q ?? "");
      return this.ok(res, { products });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };
 
 
	exportProducts = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
			const products = await this._productService.getAllProducts({ full: true  });
			console.log(products)
			const csv = this._csvConverter.fromArrToCSV(products as any[]);
			const filename = "products-list"
			res.setHeader('Content-Disposition', 'attachment; filename=' + filename);
			res.setHeader('Content-type','text/csv')
      return res.send(products);
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };

}
