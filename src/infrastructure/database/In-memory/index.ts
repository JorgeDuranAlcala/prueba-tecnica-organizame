import { Product } from "@src/domain/Product";
import { ProductProps } from "@src/domain/Product/product-props";
import { Categoria } from "@src/domain/Categoria";
import { CategoriaProps } from "@src/domain/Categoria/categoria-props";
import { User } from "@src/domain/User";
import { UserProps } from "@src/domain/User/user-props";

class Collection<
  T extends {
    id: string;
    updateProp: (props: Partial<Props>) => T;
    getProps: () => Props;
  },
  Props
> {
  private data: T[] = [];
  // eslint-disable-next-line no-unused-vars
  //private updateFn: <U>(item: T, PropsToUpdate: Partial<U>) => T;

  // eslint-disable-next-line no-unused-vars
  constructor() {}

  insert(entity: T): T {
    this.data.push(entity);
    return entity as T;
  }

  insertMany(...entities: T[]) {
    this.data.push(...entities);
  }

  getById(id: string): T | undefined {
    return this.data.find((x) => x.id === id);
  }
  update(id: string, props: Partial<Props>) {
    const item = this.data.find((x) => x.id === id);
    if (!item) return item;
    this.data = [
      ...this.data.filter((item) => item.id !== id),
      item.updateProp(props),
    ];
    return item;
  }

  delete(id: string) {
    const item = this.data.find((x) => x.id === id);
    if (!item) return item;
    this.data = this.data.filter((x) => x.id !== id);
    return true;
  }

  find(props: Record<string | number, any>) {
    return this.data.filter((d) => {
      return Object.entries(d).some(([key, value]) => props[key] === value);
    });
  }

  findAll() {
    return this.data;
  }
}
/*
function UpdateSafeboxData(
  item: Safebox,
  propsToUpdate: Partial<SafeboxProps>
): Safebox {
  const x = item;
  if (propsToUpdate.content) {
    x.updateContent(propsToUpdate.content);
  }
  return x;
}
*/

export class InMemoryDatabase {
  products: Collection<Product, ProductProps> = new Collection();
  categorias: Collection<Categoria, CategoriaProps> = new Collection();
  users: Collection<User, UserProps> = new Collection();
}
