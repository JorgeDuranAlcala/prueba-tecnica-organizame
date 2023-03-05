import { Product } from "@src/domain/Product";
import { ProductRepository } from "@src/infrastructure/productRepository/IProductRepo";
import { ProductNotFound } from "@src/libs/Error/product-not-found";

export class GetProductByIdUseCase {
  private readonly _productRepository: ProductRepository;

  private constructor(_productRepository: ProductRepository) {
    this._productRepository = _productRepository;
  }

  static create(_productRepository: ProductRepository) {
    return new GetProductByIdUseCase(_productRepository);
  }

  async get(
    id: string
  ): Promise<Product> {
    const product = await this._productRepository.findById(id);
    if (!product) throw new ProductNotFound(id);
    return product;
  }
}
