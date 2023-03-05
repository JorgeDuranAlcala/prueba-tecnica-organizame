import { Categoria } from "@src/domain/Categoria";
import { CategoriaRepository } from "@src/infrastructure/categoriaRepository/ICategoriaRepo";
import { CategoriaNotFound  } from "@src/libs/Error/categoria-not-found"

export class GetCategoriaByIdUseCase {
  private readonly _categoriaRepository: CategoriaRepository;

  private constructor(_categoriaRepository: CategoriaRepository) {
    this._categoriaRepository = _categoriaRepository;
  }

  static create(_categoriaRepository: CategoriaRepository) {
    return new GetCategoriaByIdUseCase(_categoriaRepository);
  }

  async get(id: string): Promise<Categoria | undefined> {
    const cate = await this._categoriaRepository.findById(id);
		if (!cate) throw new CategoriaNotFound(id);
    return cate;
  }

}
