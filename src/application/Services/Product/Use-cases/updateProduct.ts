import { Product } from "@src/domain/Product";
import { IUpdateProductDto } from "@src/domain/Product/dtos/updateProductDTO";
import { ProductRepository } from "@src/infrastructure/productRepository/IProductRepo";
import { ProductNotFound } from "@src/libs/Error/product-not-found";

export class UpdateProductUseCase {
  private readonly _productRepository: ProductRepository;

  private constructor(_productRepository: ProductRepository) {
    this._productRepository = _productRepository;
  }

  static create(_productRepository: ProductRepository) {
    return new UpdateProductUseCase(_productRepository);
  }

  async update(
    id: string,
    updateProductDTO: IUpdateProductDto
  ): Promise<Product> {
    const product = await this._productRepository.update(id, updateProductDTO);
    if (!product) throw new ProductNotFound(id);
    return product;
  }
}
