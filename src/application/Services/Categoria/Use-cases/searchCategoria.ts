import { Categoria } from "@src/domain/Categoria";
import { CategoriaRepository } from "@src/infrastructure/categoriaRepository/ICategoriaRepo";

export class SearchCategoriasUseCase {
  private readonly _categoriaRepository: CategoriaRepository;

  private constructor(_categoriaRepository: CategoriaRepository) {
    this._categoriaRepository = _categoriaRepository;
  }

  static create(_categoriaRepository: CategoriaRepository) {
    return new SearchCategoriasUseCase(_categoriaRepository);
  }

  async search(query: string): Promise<Categoria[]> {
    const cate = await this._categoriaRepository.findAll();
    return cate.filter(
      (c) =>
        c.nombre_categoria.includes(query) ||
        c.descripcion.includes(query) ||
        c.nombre_corto.includes(query)
    );
  }
}
