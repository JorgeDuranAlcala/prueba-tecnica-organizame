import { IUDgenerator } from "@src/libs/UIDgenerator/IUIDgenerator";
import { UIDgenerator } from "@src/libs/UIDgenerator/uid-generator";
import { Entity } from "../Entity";
import { CategoriaProps } from "./categoria-props";

const IDgenerator: IUDgenerator = UIDgenerator.create();

export class Categoria extends Entity<CategoriaProps> {
  private constructor(props: CategoriaProps, id?: string) {
    super({ ...props }, !id ? IDgenerator.gen() : id);
  }

  static create({ id, ...props }: CategoriaProps): Categoria {
    const instance = new Categoria({ ...props }, id);
    return instance;
  }

  public get id(): string {
    return this._id;
  }

  public get nombre_corto(): string {
    return this.props.nombre_corto;
  }

  public get descripcion(): string {
    return this.props.descripcion;
  }

  public get nombre_categoria(): string {
    return this.props.nombre_categoria;
  }

  public getProps(): CategoriaProps {
    return this.props;
  }
}
