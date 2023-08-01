import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsString, IsOptional, MaxLength } from "class-validator";

export interface IUpdateCategoriaDto {
  nombre_corto: string;
  descripcion: string;
  nombre_categoria: string;
}

@Exclude()
export class UpdateCategoriaDto implements Partial<IUpdateCategoriaDto> {
  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public nombre_categoria?: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public descripcion?: string;

  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  public nombre_corto?: string;

  static create({
    nombre_corto,
    descripcion,
    nombre_categoria,
  }: Partial<IUpdateCategoriaDto>) {
    return new UpdateCategoriaDto({
      nombre_corto,
      descripcion,
      nombre_categoria,
    });
  }

  constructor({
    nombre_corto,
    descripcion,
    nombre_categoria,
  }: Partial<IUpdateCategoriaDto>) {
    this.nombre_corto = nombre_corto;
    this.descripcion = descripcion;
    this.nombre_categoria = nombre_categoria;
  }
}
