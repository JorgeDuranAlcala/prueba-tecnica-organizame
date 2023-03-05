import { Categoria } from "@src/domain/Categoria";
import { CategoriaProps } from "@src/domain/Categoria/categoria-props";
import { InMemoryDatabase } from "../database/In-memory";
import { CategoriaRepository } from "./ICategoriaRepo";

export class InMemoryCategoriaRepo implements CategoriaRepository {
  constructor(private readonly _database: InMemoryDatabase) {
    this._database = _database;
  }

  async create(product: Categoria): Promise<Categoria> {
    return this._database.categorias.insert(product);
  }

	async find(props: Partial<CategoriaProps>) {
		return this._database.categorias.find(props)
	}

  async findById(id: string): Promise<Categoria | undefined> {
    const found = this._database.categorias.getById(id);
    if (!found) return found;
    return found;
  }

  async update(
    id: string,
    dataToUpdate: Partial<CategoriaProps>
  ): Promise<Categoria | undefined> {
    const data = this._database.categorias.update(id, dataToUpdate);
    if (!data) return data;
    return data;
  }

  async remove(id: string): Promise<boolean | undefined> {
    const data = this._database.categorias.delete(id);
    if (!data) return undefined;
    return data;
  }

  async findAll(): Promise<Categoria[]> {
    return this._database.categorias.findAll();
  }
}
