import { CategoriaRepository } from "@src/infrastructure/categoriaRepository/ICategoriaRepo";
import { CategoriaNotFound  } from "@src/libs/Error/categoria-not-found"

export class RemoveCategoriaUseCase {
  private readonly _categoriaRepository: CategoriaRepository;

  private constructor(_categoriaRepository: CategoriaRepository) {
    this._categoriaRepository = _categoriaRepository;
  }

  static create(_categoriaRepository: CategoriaRepository) {
    return new RemoveCategoriaUseCase(_categoriaRepository);
  }

  async remove(id: string): Promise<boolean> {
    const cate = await this._categoriaRepository.remove(id);
		if (!cate) throw new CategoriaNotFound(id);
    return cate;
  }

}
