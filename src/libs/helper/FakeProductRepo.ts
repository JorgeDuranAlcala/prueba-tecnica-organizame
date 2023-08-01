import { ProductRepository } from "@src/infrastructure/productRepository/IProductRepo";
import { Product } from "@src/domain/Product";
import { ProductProps } from "@src/domain/Product/product-props";

let _fakedb: Product[] = [];

export class FakeProductRepo implements ProductRepository {
  create = jest
    .fn()
    .mockImplementation((product: Product): Promise<Product> => {
      _fakedb.push(product);
      return Promise.resolve(product);
    });

  find = jest.fn().mockImplementation((props: Record<string | number, any>) => {
    return _fakedb.filter((d) => {
      return Object.entries(d.getProps()).some(
        ([key, value]) => props[key] === value
      );
    });
  });

  update = jest
    .fn()
    .mockImplementation(
      (id: string, dataToUpdate: Partial<ProductProps>): Promise<Product> => {
        const product = _fakedb.find((s) => s.id === id);
        if (!product) throw new Error("not found");
        const data = {
          id: product.id,
          nombre_producto:
            dataToUpdate.nombre_producto || product.nombre_producto,
        };
        _fakedb = _fakedb.map((s) =>
          s.id === id ? product.updateProp(dataToUpdate) : s
        );
        const updated_product = _fakedb.find((s) => s.id === id) as Product;
        return Promise.resolve(updated_product);
      }
    );

  findById = jest.fn().mockImplementation((id: string): Promise<Product> => {
    const product = _fakedb.find((s) => s.id === id);
    if (!product) throw new Error("not found");
    return Promise.resolve(product);
  });

  findAll = jest.fn().mockImplementation((): Promise<Product[]> => {
    return Promise.resolve(_fakedb);
  });

  remove = jest.fn().mockImplementation((id: string): Promise<boolean> => {
    const productIndex = _fakedb.findIndex((s) => s.id === id);
    _fakedb.splice(productIndex, 1);
    if (_fakedb.findIndex((s) => s.id === id) !== -1) {
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  });
}
