import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export interface ICreateCategoriaDto {
  nombre_corto: string;
  nombre_categoria: string;
  descripcion: string;
}

@Exclude()
export class CreateCategoriaDto implements ICreateCategoriaDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  public nombre_corto: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  public descripcion: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public nombre_categoria: string;

  static create({
    nombre_corto,
    descripcion,
    nombre_categoria,
  }: ICreateCategoriaDto) {
    return new CreateCategoriaDto(nombre_corto, descripcion, nombre_categoria);
  }

  constructor(
    nombre_corto: string,
    descripcion: string,
    nombre_categoria: string
  ) {
    this.nombre_corto = nombre_corto;
    this.descripcion = descripcion;
    this.nombre_categoria = nombre_categoria;
  }
}
