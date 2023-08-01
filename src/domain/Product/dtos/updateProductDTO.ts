import { Exclude, Expose } from "class-transformer";
import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  MaxLength,
} from "class-validator";

export interface IUpdateProductDto {
  nombre_producto: string;
  descripcion: string;
  precio: number;
  categoria: string;
  sku: string;
}

@Exclude()
export class UpdateProductDto implements Partial<IUpdateProductDto> {
  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public nombre_producto?: string;

  @Expose()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  public descripcion?: string;

  @Expose()
  @IsOptional()
  @IsNumber()
  public precio?: number;

  @Expose()
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  public categoria?: string;

  @Expose()
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @MaxLength(5)
  public sku?: string;

  static create({
    nombre_producto,
    descripcion,
    precio,
    categoria,
    sku,
  }: Partial<IUpdateProductDto>) {
    return new UpdateProductDto({
      nombre_producto,
      descripcion,
      precio,
      categoria,
      sku,
    });
  }

  constructor({
    nombre_producto,
    descripcion,
    precio,
    categoria,
    sku,
  }: Partial<IUpdateProductDto>) {
    this.nombre_producto = nombre_producto;
    this.descripcion = descripcion;
    this.precio = precio;
    this.categoria = categoria;
    this.sku = sku;
  }
}
