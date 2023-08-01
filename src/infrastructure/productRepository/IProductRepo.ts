/* eslint-disable no-unused-vars */
import { Product } from "@src/domain/Product";
import { ProductProps } from "@src/domain/Product/product-props";

export interface ProductRepository {
  create(product: Product): Promise<Product>;
  findById(id: string): Promise<Product | undefined>;
  update(
    id: string,
    PropsToUpdate: Partial<ProductProps>
  ): Promise<Product | undefined>;
  remove(id: string): Promise<boolean | undefined>;
  findAll(): Promise<Product[]>;
  find(props: Record<string | number, any>): Promise<Product[]>;
}
