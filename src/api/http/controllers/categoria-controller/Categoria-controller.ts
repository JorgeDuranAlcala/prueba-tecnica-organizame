import { ICategoriaService } from "@src/application/Services/Categoria/ICategoriaService";
import { CreateCategoriaDto } from "@src/domain/Categoria/dtos/createCategoriaDTO";
import { UpdateCategoriaDto } from "@src/domain/Categoria/dtos/updateCategoriaDTO";
import { IValidator } from "@src/libs/Validator/IValidator";
import { NextFunction, Request, Response } from "express";
import { BaseController } from "../base-controller";
import { ICategoriaController } from "./ICategoriaController";
import { RepeatedNombreCortoError  } from "@src/libs/Error/RepeatedNombreCorto"
import { MalformedDataError } from "@src/libs/Error/Malformed-data"

export class CategoriaController
  extends BaseController
  implements ICategoriaController
{
  private readonly _categoriaService: ICategoriaService;
  private readonly _validator: IValidator;
  constructor(
    _categoriaService: ICategoriaService,
    _validator: IValidator,
  ) {
    super();
    this._validator = _validator;
    this._categoriaService = _categoriaService;
  }

  createNewCategoria = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const createDto = this.bodyParser(
        CreateCategoriaDto,
        req.body as Record<string, unknown>
      );
      await this._validator.validate(createDto);
			const categoria = await this._categoriaService.find({ nombre_corto: createDto.nombre_corto  })
      if (categoria.length > 0) throw new RepeatedNombreCortoError(createDto.nombre_corto);
      const new_categoria_data = await this._categoriaService.createCategoria(
        createDto
      );
      return this.ok(res, { id: new_categoria_data.id, categoria: new_categoria_data });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };

  getCategoriaById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const { id } = req.params;
      const categoria = await this._categoriaService.getById(id);
      return this.ok(res, { categoria  });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };

	searchCategoria = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const q = req.query?.q as string;
      const categorias = await this._categoriaService.search(q);
      return this.ok(res, { categorias  });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
	}

  updateCategoria = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const { id } = req.params;
			
			const updateDto = UpdateCategoriaDto.create({ 
				nombre_corto: req.body.nombre_corto,
				descripcion: req.body.descripcion,
				nombre_categoria: req.body.nombre_categoria
			})
      const allUndefined = Object.values(updateDto).every(x => !x);
			if (allUndefined) throw MalformedDataError.create(); 
      await this._validator.validate(updateDto);
			const propsToUpdate = Object.entries(updateDto).reduce<{[x: string]: unknown}>((acc,[currKey, currValue]) => (
				currValue ? {...acc, [currKey]: currValue} : acc
			), {})
      await this._categoriaService.updateCategoria(id, propsToUpdate);
      return this.ok(res, {
				id,
        message: "Content of the categoria updated correctly",
      });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };

  removeCategoria = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const { id } = req.params;
      const removed = await this._categoriaService.remove(id);
      return this.ok(res, { removed, id });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };

  getCategoriaByName = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const { name } = req.params;
      const categoria = await this._categoriaService.find({ nombre_categoria: name  });
      return this.ok(res, { categoria });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };

	getCategorias =  async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void | Response> => {
    try {
      const categorias = await this._categoriaService.getAllCategorias();
      return this.ok(res, { categorias  });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };
 
}
