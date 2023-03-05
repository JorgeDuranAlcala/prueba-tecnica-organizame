import { Product } from "@src/domain/Product";
import { ProductProps } from "@src/domain/Product/product-props";
import { InMemoryDatabase } from "../database/In-memory";
import { ProductRepository } from "./IProductRepo";

export class InMemoryProductRepo implements ProductRepository {
  constructor(private readonly _database: InMemoryDatabase) {
    this._database = _database;
  }

  async create(product: Product): Promise<Product> {
    return this._database.products.insert(product);
  }

	async find(props: Partial<ProductProps>) {
		return this._database.products.find(props)
	}

  async findById(id: string): Promise<Product | undefined> {
    const found = this._database.products.getById(id);
    if (!found) return found;
    return found;
  }

  async update(
    id: string,
    dataToUpdate: Partial<ProductProps>
  ): Promise<Product | undefined> {
    const data = this._database.products.update(id, dataToUpdate);
    if (!data) return data;
    return data;
  }

  async remove(id: string): Promise<boolean | undefined> {
    const data = this._database.products.delete(id);
    if (!data) return undefined;
    return data;
  }

  async findAll(): Promise<Product[]> {
    return this._database.products.findAll();
  }
}
