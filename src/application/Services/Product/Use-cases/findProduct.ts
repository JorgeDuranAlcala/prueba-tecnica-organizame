import { Product } from "@src/domain/Product";
import { ProductRepository } from "@src/infrastructure/productRepository/IProductRepo";

export class FindProductUseCase {
  private readonly _productRepository: ProductRepository;

  private constructor(_productRepository: ProductRepository) {
    this._productRepository = _productRepository;
  }

  static create(_productRepository: ProductRepository) {
    return new FindProductUseCase(_productRepository);
  }

  async find(
		props: Record<string | number, any>
  ): Promise<Product[]> {
		const products = ( await this._productRepository.findAll() ).filter(x => {
			return Object.entries(x.getProps()).some(([key, value]) => props[key] === value )
		})
    return products
  }
}
