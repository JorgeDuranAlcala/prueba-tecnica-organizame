import { CategoriaRepository } from "@src/infrastructure/categoriaRepository/ICategoriaRepo";
import { Categoria } from "@src/domain/Categoria";

export class FindCategoriaUseCase {
  private readonly _categoriaRepository: CategoriaRepository;

  private constructor(_categoriaRepository: CategoriaRepository) {
    this._categoriaRepository = _categoriaRepository;
  }

  static create(_categoriaRepository: CategoriaRepository) {
    return new FindCategoriaUseCase(_categoriaRepository);
  }

	async find(
   	props: Record<string | number, any>
	): Promise<Categoria[]> {
		const cate = (await this._categoriaRepository.findAll()).filter(x => {
			return Object.entries(x.getProps()).some(([key, value]) => props[key] === value)
		})
    return cate;
  }

}
