import { CategoriaRepository } from "@src/infrastructure/categoriaRepository/ICategoriaRepo";
import { Categoria } from "@src/domain/Categoria";
import { CategoriaProps } from "@src/domain/Categoria/categoria-props";

let _fakedb: Categoria[] = [];

export class FakeCategoriaRepo implements CategoriaRepository {
  create = jest
    .fn()
    .mockImplementation((categoria: Categoria): Promise<Categoria> => {
      _fakedb.push(categoria);
      return Promise.resolve(categoria);
    });

  update = jest
    .fn()
    .mockImplementation(
      (
        id: string,
        dataToUpdate: Partial<CategoriaProps>
      ): Promise<Categoria> => {
        const categoria = _fakedb.find((s) => s.id === id);
        if (!categoria) throw new Error("not found");
        const data = {
          id: categoria.id,
          nombre_categoria:
            dataToUpdate.nombre_categoria || categoria.nombre_categoria,
        };
        _fakedb = _fakedb.map((s) =>
          s.id === id ? categoria.updateProp(dataToUpdate) : s
        );
        const updated_categoria = _fakedb.find((s) => s.id === id) as Categoria;
        return Promise.resolve(updated_categoria);
      }
    );

  find = jest.fn().mockImplementation((props: Record<string | number, any>) => {
    return _fakedb.filter((d) => {
      console.log(
        Object.entries(d.getProps()).some(
          ([key, value]) => props[key] === value
        )
      );

      return Object.entries(d.getProps()).some(
        ([key, value]) => props[key] === value
      );
    });
  });

  findById = jest.fn().mockImplementation((id: string): Promise<Categoria> => {
    const categoria = _fakedb.find((s) => s.id === id);
    if (!categoria) throw new Error("not found");
    return Promise.resolve(categoria);
  });

  findAll = jest.fn().mockImplementation((): Promise<Categoria[]> => {
    return Promise.resolve(_fakedb);
  });

  remove = jest.fn().mockImplementation((id: string): Promise<boolean> => {
    const categoriaIndex = _fakedb.findIndex((s) => s.id === id);
    _fakedb.splice(categoriaIndex, 1);
    if (_fakedb.findIndex((s) => s.id === id) !== -1) {
      return Promise.resolve(false);
    }
    return Promise.resolve(true);
  });
}
