import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsString, IsNumber, MaxLength } from "class-validator";

export interface ICreateProductDto {
  nombre_producto: string;
  descripcion: string;
  precio: number;
  categoria: string;
  sku: string;
}

@Exclude()
export class CreateProductDto implements ICreateProductDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  public nombre_producto: string;

  @Expose()
  @IsNotEmpty()
  @IsString()
  public descripcion: string;

  @Expose()
  @IsNumber()
  public precio: number;

  @Expose()
  @IsString()
  @IsNotEmpty()
  public categoria: string;

  @Expose()
  @IsString()
  @IsNotEmpty()
  @MaxLength(5)
  public sku: string;

  static create({
    nombre_producto,
    descripcion,
    precio,
    categoria,
    sku,
  }: ICreateProductDto) {
    return new CreateProductDto(
      nombre_producto,
      descripcion,
      precio,
      categoria,
      sku
    );
  }

  constructor(
    nombre_producto: string,
    descripcion: string,
    precio: number,
    categoria: string,
    sku: string
  ) {
    this.nombre_producto = nombre_producto;
    this.descripcion = descripcion;
    this.precio = precio;
    this.categoria = categoria;
    this.sku = sku;
  }
}
