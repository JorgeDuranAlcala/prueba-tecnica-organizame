import { Categoria } from "@src/domain/Categoria";
import { ICreateCategoriaDto} from "@src/domain/Categoria/dtos/createCategoriaDTO";
import { CategoriaRepository } from "@src/infrastructure/categoriaRepository/ICategoriaRepo";
import { RepeatedNombreCortoError  } from "@src/libs/Error/RepeatedNombreCorto"

export class CreateCategoriaUseCase {
  private readonly _categoriaRepository: CategoriaRepository;

  private constructor(_categoriaRepository: CategoriaRepository) {
    this._categoriaRepository = _categoriaRepository;
  }

  static create(_categoriaRepository: CategoriaRepository) {
    return new CreateCategoriaUseCase(_categoriaRepository);
  }

  async createNew(createCategoriaDTO: ICreateCategoriaDto): Promise<Categoria> {
		/*const existsNombreCorto = (await this._categoriaRepository.findAll()).find( x => (
			    x.nombre_corto === createCategoriaDTO.nombre_corto 
		  )
		)
		if (existsNombreCorto) throw new RepeatedNombreCortoError(createCategoriaDTO.nombre_corto); 
    */
		const categoriaData = Categoria.create({ ...createCategoriaDTO  })
    const cate = await this._categoriaRepository.create(categoriaData);
    return cate;
  }

}
