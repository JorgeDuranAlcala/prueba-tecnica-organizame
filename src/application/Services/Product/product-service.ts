import { ICreateProductDto} from "@src/domain/Product/dtos/createProductDTO";
import { IUpdateProductDto} from "@src/domain/Product/dtos/updateProductDTO";
import { ProductRepository } from "@src/infrastructure/productRepository/IProductRepo";
import { CreateProductUseCase } from "./Use-cases/createProduct";
import { UpdateProductUseCase  } from "./Use-cases/updateProduct"
import { RemoveProductUseCase  } from "./Use-cases/removeProduct"
import { GetProductByIdUseCase  } from "./Use-cases/getProductById"
import { FindProductUseCase  } from "./Use-cases/findProduct"
import { GetAllProductsUseCase  } from "./Use-cases/getAllProducts"
import { SearchProductsUseCase  } from "./Use-cases/searchProduct"
import type { GetAllProductOptions  } from "./Use-cases/getAllProducts" 
import { CategoriaRepository } from "@src/infrastructure/categoriaRepository/ICategoriaRepo";
import { IProductService  } from "@src/application/Services/Product/IProductService"


export class ProductService implements IProductService {
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
    const instance = new ProductService(_productRepository, _categoriaRepository);
    return instance;
  }

  async createProduct(createProductDTO: ICreateProductDto) {
    return await CreateProductUseCase.create(
      this._productRepository,
			this._categoriaRepository
    ).createNew(createProductDTO);
  }

	async search(query: string) {
		return await SearchProductsUseCase.create(
			this._productRepository
		).search(query) 
	}

	async find(props: Record<string | number, any> ) {
		return await FindProductUseCase.create(
			this._productRepository
		)
		.find(props)
	}

  async updateProduct(id: string, updateProductDto: IUpdateProductDto) {
    return await UpdateProductUseCase.create(
      this._productRepository,
    ).update(id, updateProductDto);
  }

	async getAllProducts(options?: Partial<GetAllProductOptions>) {
		return await GetAllProductsUseCase.create(
			this._productRepository,
			this._categoriaRepository,
		).get(options)
	}

  async getById(id: string) {
    return await GetProductByIdUseCase.create(
      this._productRepository,
    ).get(id);
  }


  async remove(id: string): Promise<boolean> {
		return await RemoveProductUseCase.create(
			this._productRepository
		).remove(id)    
  }
}
