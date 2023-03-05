import { ProductRepository } from "@src/infrastructure/productRepository/IProductRepo";
import { ProductNotFound } from "@src/libs/Error/product-not-found";

export class RemoveProductUseCase {
  private readonly _productRepository: ProductRepository;

  private constructor(_productRepository: ProductRepository) {
    this._productRepository = _productRepository;
  }

  static create(_productRepository: ProductRepository) {
    return new RemoveProductUseCase(_productRepository);
  }

  async remove(
    id: string
  ): Promise<boolean> {
    const result = await this._productRepository.remove(id);
    if (!result) throw new ProductNotFound(id);
    return result;
  }
}
