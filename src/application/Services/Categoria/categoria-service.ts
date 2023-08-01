import { ICreateCategoriaDto } from "@src/domain/Categoria/dtos/createCategoriaDTO";
import { CategoriaRepository } from "@src/infrastructure/categoriaRepository/ICategoriaRepo";
import { IUpdateCategoriaDto } from "@src/domain/Categoria/dtos/updateCategoriaDTO";
import { CreateCategoriaUseCase } from "./Use-cases/createCategoria";
import { UpdateCategoriaUseCase } from "./Use-cases/updateCategoria";
import { RemoveCategoriaUseCase } from "./Use-cases/removeCategoria";
import { GetCategoriaByIdUseCase } from "./Use-cases/getCategoriaById";
import { GetAllCategoriasUseCase } from "./Use-cases/GetAllCategorias";
import { FindCategoriaUseCase } from "./Use-cases/findCategoria";
import { SearchCategoriasUseCase } from "./Use-cases/searchCategoria";
import { ICategoriaService } from "@src/application/Services/Categoria/ICategoriaService";

export class CategoriaService implements ICategoriaService {
  private readonly _categoriaRepository: CategoriaRepository;

  private constructor(_categoriaRepository: CategoriaRepository) {
    this._categoriaRepository = _categoriaRepository;
  }

  static create(_categoriaRepository: CategoriaRepository) {
    const instance = new CategoriaService(_categoriaRepository);
    return instance;
  }

  async createCategoria(createCategoriaDTO: ICreateCategoriaDto) {
    return await CreateCategoriaUseCase.create(
      this._categoriaRepository
    ).createNew(createCategoriaDTO);
  }

  async find(props: Record<string | number, any>) {
    return await FindCategoriaUseCase.create(this._categoriaRepository).find(
      props
    );
  }

  async search(query: string) {
    return await SearchCategoriasUseCase.create(
      this._categoriaRepository
    ).search(query);
  }

  async updateCategoria(id: string, updateCategoriaDto: IUpdateCategoriaDto) {
    return await UpdateCategoriaUseCase.create(
      this._categoriaRepository
    ).update(id, updateCategoriaDto);
  }

  async getAllCategorias() {
    return await GetAllCategoriasUseCase.create(
      this._categoriaRepository
    ).getAll();
  }

  async getById(id: string) {
    return await GetCategoriaByIdUseCase.create(this._categoriaRepository).get(
      id
    );
  }

  async remove(id: string): Promise<boolean> {
    return RemoveCategoriaUseCase.create(this._categoriaRepository).remove(id);
  }
}
