import { ICreateCategoriaDto } from "@src/domain/Categoria/dtos/createCategoriaDTO";
import { Categoria } from "@src/domain/Categoria";
import { CategoriaProps } from "@src/domain/Categoria/categoria-props";

export interface ICategoriaService {
  createCategoria(createCategoriaDTO: ICreateCategoriaDto): Promise<Categoria>;
  updateCategoria(
    id: string,
		propsToUpdate: Partial<CategoriaProps>
  ): Promise<Categoria>;
	getAllCategorias(): Promise<Categoria[]>
  getById(id: string): Promise<Categoria | undefined>;
  remove(id: string): Promise<boolean>;
  find(props: Record<string | number, any> ): Promise<Categoria[]>
	search(query: string): Promise<Categoria[]>
}
