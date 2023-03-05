import { UpdateCategoriaDto  } from "@src/domain/Categoria/dtos/updateCategoriaDTO"
import { CategoriaRepository } from "@src/infrastructure/categoriaRepository/ICategoriaRepo";
import { CategoriaNotFound  } from "@src/libs/Error/categoria-not-found"
import { Categoria } from "@src/domain/Categoria";
import { CategoriaProps } from "@src/domain/Categoria/categoria-props";
export class UpdateCategoriaUseCase {
  private readonly _categoriaRepository: CategoriaRepository;

  private constructor(_categoriaRepository: CategoriaRepository) {
    this._categoriaRepository = _categoriaRepository;
  }

  static create(_categoriaRepository: CategoriaRepository) {
    return new UpdateCategoriaUseCase(_categoriaRepository);
  }

  async update(id: string, updateDto: UpdateCategoriaDto): Promise<Categoria> {
    const cate = await this._categoriaRepository.update(id, updateDto);
		if (!cate) throw new CategoriaNotFound(id);
    return cate;
  }

}
