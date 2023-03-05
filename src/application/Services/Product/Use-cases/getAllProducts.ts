import { ProductRepository } from "@src/infrastructure/productRepository/IProductRepo";
import { CategoriaRepository } from "@src/infrastructure/categoriaRepository/ICategoriaRepo";
export type GetAllProductOptions = {
	full: boolean
}

export class GetAllProductsUseCase {
  private readonly _productRepository: ProductRepository;
private readonly _categoriaRepository: CategoriaRepository;
  private constructor(
		_productRepository: ProductRepository,
    _categoriaRepository: CategoriaRepository
	) {
    this._productRepository = _productRepository;
    this._categoriaRepository = _categoriaRepository;
  }

  static create(
		_productRepository: ProductRepository,
    _categoriaRepository: CategoriaRepository
	) {
    return new GetAllProductsUseCase(
			_productRepository,
      _categoriaRepository
		);
  }

  async get(options?: Partial<GetAllProductOptions> ) {
    const products = await this._productRepository.findAll();
		if (options?.full) {
			console.log(products)
			const products_with_categories = await Promise.all(
				products.map(async (p) => { 	
					const categoria = await this._categoriaRepository.findById(p.categoria)
					return {
						product_id: p.id,
						nombre_producto: p.nombre_producto,
						descripcion_producto: p.descripcion,
						sku: p.sku,
						precio: p.precio,
						categoria_id: categoria?.id,
						nombre_categoria: categoria?.nombre_categoria,
						nombre_corto_categoria: categoria?.nombre_corto,
						descripcion_categoria: categoria?.descripcion
					}	
				})
			)
			return products_with_categories
		}
    return products;
  }
}
