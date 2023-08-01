import { IProductService } from "../../src/application/Services/Product/IProductService";
import { ProductService } from "../../src/application/Services/Product/product-service";
import { ProductRepository } from "../../src/infrastructure/productRepository/IProductRepo";
import { CreateProductDto } from "../../src/domain/Product/dtos/createProductDTO";
import { UpdateProductDto } from "../../src/domain/Product/dtos/updateProductDTO";
import { Product } from "../../src/domain/Product";
import { FakeProductRepo } from "../../src/libs/helper/FakeProductRepo";
import { FakeCategoriaRepo } from "../../src/libs/helper/FakeCategoriaRepo";
import { CategoriaRepository } from "../../src/infrastructure/categoriaRepository/ICategoriaRepo";
import { ICategoriaService } from "../../src/application/Services/Categoria/ICategoriaService";
import { CategoriaService } from "../../src/application/Services/Categoria/categoria-service";
import { CreateCategoriaDto } from "../../src/domain/Categoria/dtos/createCategoriaDTO";
import { Categoria } from "../../src/domain/Categoria";

describe("Product service", () => {
  let productService: IProductService;
  let _fakeProductRepository: ProductRepository;
  let _fakeCategoriaRepository: CategoriaRepository;
  let product_id: string;
  let data: CreateProductDto;
  let created_product: Product;
  let categoriaId: string;
  let categoriaService: ICategoriaService;

  beforeEach(async () => {
    _fakeProductRepository = new FakeProductRepo();
    _fakeCategoriaRepository = new FakeCategoriaRepo();
    categoriaService = CategoriaService.create(_fakeCategoriaRepository);

    productService = ProductService.create(
      _fakeProductRepository,
      _fakeCategoriaRepository
    );
    const dataCate: CreateCategoriaDto = {
      nombre_corto: "A",
      descripcion: "desc categoria A",
      nombre_categoria: "A",
    };
    const cate_dto = CreateCategoriaDto.create(dataCate);
    const created_categoria: Categoria = await categoriaService.createCategoria(
      cate_dto
    );

    categoriaId = created_categoria.id;

    data = {
      nombre_producto: "product A",
      descripcion: "desc product A",
      precio: 44.44,
      categoria: categoriaId,
      sku: "GRAL",
    };
    const dto = CreateProductDto.create(data);

    created_product = await productService.createProduct(dto);
    product_id = created_product.id;
  });

  afterEach(async () => {
    //jest.clearAllMocks();
    await productService.remove(product_id);
    await categoriaService.remove(categoriaId);
  });

  test("create a new product", async () => {
    expect(_fakeProductRepository.create).toHaveBeenCalled();
    expect(_fakeProductRepository.create).toHaveBeenCalledTimes(1);
    expect(created_product.nombre_producto).toEqual(data.nombre_producto);
    expect(created_product.descripcion).toEqual(data.descripcion);
    expect(created_product.sku.length).toBeLessThanOrEqual(5);
    expect(created_product.categoria).toEqual(categoriaId);
  });

  test("Should not create product if the category does not exist yet.", async () => {
    try {
      const wrongId = "2";

      const productData = {
        nombre_producto: "product A",
        descripcion: "desc product A",
        precio: 44.44,
        categoria: wrongId,
        sku: "GRAL",
      };

      const dto = CreateProductDto.create(productData);
      await productService.createProduct(dto);
    } catch (error) {
      if (!(error instanceof Error)) return;
      expect(_fakeCategoriaRepository.findById).toThrow();
      expect(_fakeCategoriaRepository.findById).toThrowError();
      expect(error.message).toMatch(/not found/i);
    }
  });

  test("find a product by name", async () => {
    const params = {
      nombre_producto: created_product.nombre_producto,
    };
    const product: Product[] = await productService.find(params);
    expect(product).toBeDefined();
    expect(product).toContain(created_product);
    expect(_fakeProductRepository.findAll).toHaveBeenCalled();
  });

  test("Search for a product that does not exist", async () => {
    const params = {
      nombre_producto: "product-abgdh2",
    };
    const product: Product[] = await productService.find(params);
    expect(product).toBeDefined();
    expect(product).not.toContain(created_product);
    expect(product.length).toEqual(0);
    expect(_fakeProductRepository.findAll).toHaveBeenCalled();
  });

  test("find a product by its ID", async () => {
    const product: Product = await productService.getById(product_id);
    expect(product).toBeDefined();
    expect(_fakeProductRepository.findById).toHaveBeenCalled();
    expect(_fakeProductRepository.findById).toHaveBeenCalledTimes(1);
    expect(_fakeProductRepository.findById).toHaveBeenCalledWith(product_id);
  });

  test("product not found", async () => {
    try {
      const wrongId = "2";
      await productService.getById(wrongId);
    } catch (error) {
      if (!(error instanceof Error)) return;
      expect(_fakeProductRepository.findById).toThrow();
      expect(_fakeProductRepository.findById).toThrowError();
      expect(error.message).toMatch(/not found/i);
    }
  });

  test("Remove a product by its ID", async () => {
    const result = await productService.remove(product_id);
    expect(result).toBeDefined();
    expect(result).toBeTruthy();
    expect(_fakeProductRepository.remove).toHaveBeenCalled();
    expect(_fakeProductRepository.remove).toHaveBeenCalledTimes(1);
    expect(_fakeProductRepository.remove).toHaveBeenCalledWith(product_id);
  });

  test("Product not found while performing remove operation", async () => {
    try {
      const wrongId = "2";
      await productService.remove(wrongId);
    } catch (error) {
      if (!(error instanceof Error)) return;
      expect(_fakeProductRepository.remove).toThrow();
      expect(_fakeProductRepository.remove).toThrowError();
      expect(error.message).toMatch(/not found/i);
    }
  });

  test("update a product", async () => {
    const dataUpdateDto = {
      nombre_producto: "some text 1",
    };
    const updateDto = UpdateProductDto.create(dataUpdateDto);
    const product: Product = await productService.updateProduct(
      product_id,
      updateDto
    );
    expect(product).toBeDefined();
    expect(product.nombre_producto.length).toEqual(
      dataUpdateDto.nombre_producto.length
    );
    expect(product.nombre_producto).toContain(dataUpdateDto.nombre_producto);
    expect(_fakeProductRepository.update).toHaveBeenCalled();
    expect(_fakeProductRepository.update).toHaveBeenCalledTimes(1);
    expect(_fakeProductRepository.update).toHaveBeenCalledWith(
      product_id,
      updateDto
    );
  });
  test("updateProduct should throw an error when product does not exist", async () => {
    try {
      const dataUpdateDto = {
        nombre_producto: "some text 1",
      };
      const wrongId = "123";
      const updateDto = UpdateProductDto.create(dataUpdateDto);
      await productService.updateProduct(wrongId, updateDto);
    } catch (error) {
      if (!(error instanceof Error)) return;
      expect(_fakeProductRepository.update).toThrow();
      expect(_fakeProductRepository.update).toThrowError();
      expect(error.message).toMatch(/not found/i);
    }
  });

  test("should retrieve all the products", async () => {
    const products = await productService.getAllProducts();
    expect(products).toBeDefined();
    expect(products).toHaveLength(1);
    expect(_fakeProductRepository.findAll).toHaveBeenCalled();
  });

  test("should search for the products that have a 'p' letter in their name or descripcion", async () => {
    const query = "p";
    const products: Product[] = await productService.search(query);
    expect(products).toBeDefined();
    expect(products).toHaveLength(1);
    expect(_fakeProductRepository.findAll).toHaveBeenCalled();
  });
  test("should return empty array if there is no match in their name or descripcion", async () => {
    const query = "z";
    const products: Product[] = await productService.search(query);
    expect(products).toBeDefined();
    expect(products).toHaveLength(0);
    expect(_fakeProductRepository.findAll).toHaveBeenCalled();
  });

  test("should return an array representing the union of the entities Product and Categoria", async () => {
    const products = await productService.getAllProducts({ full: true });
    expect(products).toBeDefined();
    expect(products.length).toBeGreaterThanOrEqual(0);
    products.forEach((p: Record<string | number, any>) => {
      expect(p.sku).toBeDefined();
      expect(p.nombre_producto).toBeDefined();
      expect(p.descripcion_producto).toBeDefined();
      expect(p.precio).toBeDefined();
      expect(p.nombre_corto_categoria).toBeDefined();
      expect(p.nombre_categoria).toBeDefined();
      expect(p.descripcion_categoria).toBeDefined();
    });
    expect(_fakeProductRepository.findAll).toHaveBeenCalled();
  });
});
