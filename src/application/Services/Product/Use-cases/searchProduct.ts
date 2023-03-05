import { Product } from "@src/domain/Product";
import { ProductRepository } from "@src/infrastructure/productRepository/IProductRepo";

export class SearchProductsUseCase {
  private readonly _productRepository: ProductRepository;

  private constructor(_productRepository: ProductRepository) {
    this._productRepository = _productRepository;
  }

  static create(_productRepository: ProductRepository) {
    return new SearchProductsUseCase(_productRepository);
  }

  async search(query: string): Promise<Product[]> {
    const products = await this._productRepository.findAll();
		query = query.toLowerCase()
		return products					
					.filter(p => (
								p.nombre_producto.toLowerCase().includes(query) || p.descripcion.toLowerCase().includes(query)
					)
				)	
  }
}
