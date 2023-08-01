/* eslint-disable no-unused-vars */
import { Categoria } from "@src/domain/Categoria";
import { CategoriaProps } from "@src/domain/Categoria/categoria-props";

export interface CategoriaRepository {
  create(categoria: Categoria): Promise<Categoria>;
  findById(id: string): Promise<Categoria | undefined>;
  update(
    id: string,
    PropsToUpdate: Partial<CategoriaProps>
  ): Promise<Categoria | undefined>;
  remove(id: string): Promise<boolean | undefined>;
  findAll(): Promise<Categoria[]>;
  find(props: Record<string | number, any>): Promise<Categoria[]>;
}
