import { Product } from "@src/domain/Product";
import { ICreateProductDto} from "@src/domain/Product/dtos/createProductDTO";
import { ProductRepository } from "@src/infrastructure/productRepository/IProductRepo";
import { CategoriaRepository } from "@src/infrastructure/categoriaRepository/ICategoriaRepo";
import { CategoriaNotFound  } from "@src/libs/Error/categoria-not-found"

export class CreateProductUseCase {
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
    return new CreateProductUseCase(_productRepository, _categoriaRepository);
  }

  async createNew(createProductDTO: ICreateProductDto): Promise<Product> {
		const productData = Product.create({ ...createProductDTO  });
		const categoriaId = productData.categoria;
		const categoria = await this._categoriaRepository.findById(categoriaId);
		const product = await this._productRepository.create(productData);
		if (!categoria) throw new CategoriaNotFound(categoriaId);
    return product;
  }

}
