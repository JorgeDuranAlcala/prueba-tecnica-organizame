import { Categoria } from "@src/domain/Categoria";
import { CategoriaRepository } from "@src/infrastructure/categoriaRepository/ICategoriaRepo";

export class GetAllCategoriasUseCase {
  private readonly _categoriaRepository: CategoriaRepository;

  private constructor(_categoriaRepository: CategoriaRepository) {
    this._categoriaRepository = _categoriaRepository;
  }

  static create(_categoriaRepository: CategoriaRepository) {
    return new GetAllCategoriasUseCase(_categoriaRepository);
  }

  async getAll(): Promise<Categoria[]> {
    const cate = await this._categoriaRepository.findAll();
    return cate;
  }

}
