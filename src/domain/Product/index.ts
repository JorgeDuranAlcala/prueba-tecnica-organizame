import { IUDgenerator } from "@src/libs/UIDgenerator/IUIDgenerator";
import { UIDgenerator } from "@src/libs/UIDgenerator/uid-generator";
import { Entity } from "../Entity";
import { ProductProps } from "./product-props";

const IDgenerator: IUDgenerator = UIDgenerator.create();

export class Product extends Entity<ProductProps> {
  private constructor(props: ProductProps, id?: string) {
    super({ ...props }, !id ? IDgenerator.gen() : id);
  }

  static create({ id, ...props }: ProductProps): Product {
    const instance = new Product({ ...props }, id);
    return instance;
  }

  public get id(): string {
    return this._id;
  }

  public get nombre_producto(): string {
    return this.props.nombre_producto;
  }

  public get descripcion(): string {
    return this.props.descripcion;
  }

  public get sku(): string {
    return this.props.sku;
  }

  public get precio(): number {
    return this.props.precio;
  }

  public get categoria(): string {
    return this.props.categoria;
  }

  public getProps(): ProductProps {
    return this.props;
  }
}
