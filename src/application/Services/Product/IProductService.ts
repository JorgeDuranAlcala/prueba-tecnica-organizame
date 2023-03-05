import { Product } from "@src/domain/Product";
import { ProductProps  } from "@src/domain/Product/product-props"
import { ICreateProductDto } from "@src/domain/Product/dtos/createProductDTO";
import type { GetAllProductOptions  } from "./Use-cases/getAllProducts" 

export interface IProductService {
  createProduct(createProductDTO: ICreateProductDto): Promise<Product>;
  updateProduct(
    id: string,
		propsToUpdate: Partial<ProductProps>
  ): Promise<Product>;
	getAllProducts(options?: Partial<GetAllProductOptions>) : Promise<Product[] | Record<string | number, any>>
  getById(id: string): Promise<Product>;
  remove(id: string): Promise<boolean>;
  find(props: Record<string | number, any> ): Promise<Product[]>
	search(query: string): Promise<Product[]>
}
