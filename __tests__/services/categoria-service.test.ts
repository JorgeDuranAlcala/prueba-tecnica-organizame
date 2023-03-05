import { ICategoriaService } from "../../src/application/Services/Categoria/ICategoriaService";
import { CategoriaService } from "../../src/application/Services/Categoria/categoria-service";
import { CategoriaRepository } from "../../src/infrastructure/categoriaRepository/ICategoriaRepo";
import { CreateCategoriaDto } from "../../src/domain/Categoria/dtos/createCategoriaDTO";
import { UpdateCategoriaDto } from "../../src/domain/Categoria/dtos/updateCategoriaDTO";
import { Categoria } from "../../src/domain/Categoria";
import { FakeCategoriaRepo } from "../../src/libs/helper/FakeCategoriaRepo";

describe("Categoria service", () => {
  let categoriaService: ICategoriaService;
  let _fakeCategoriaRepository: CategoriaRepository;
  let categoria_id: string;

  beforeEach(() => {
    _fakeCategoriaRepository = new FakeCategoriaRepo();
    categoriaService = CategoriaService.create(_fakeCategoriaRepository);
  });

  afterEach(async () => {
    //jest.clearAllMocks();
    await categoriaService.remove(categoria_id);
  });

  test("create a new Categoria", async () => {
    const data = {
				nombre_corto: "AAA",
        descripcion: "desc categoria A",
				nombre_categoria: "A"
    };
    const dto = CreateCategoriaDto.create(data);
    const created_categoria: Categoria = await categoriaService.createCategoria(dto);
    categoria_id = created_categoria.id;
    expect(_fakeCategoriaRepository.create).toHaveBeenCalled();
    expect(_fakeCategoriaRepository.create).toHaveBeenCalledTimes(1);
    expect(created_categoria.nombre_categoria).toEqual(data.nombre_categoria);
    expect(created_categoria.descripcion).toEqual(data.descripcion);
  });

	describe("Categorias CRUD", () => {
		let created_categoria: Categoria;
		beforeEach(async () => {
			const data = {
				nombre_corto: "AAA",
        descripcion: "desc categoria A",
				nombre_categoria: "A"
			};	
			const dto = CreateCategoriaDto.create(data);
			created_categoria = await categoriaService.createCategoria(dto);
			categoria_id = created_categoria.id;

		})


	test("find a categoria by its ID", async () => {
    const cate = await categoriaService.getById(categoria_id);
    expect(cate).toBeDefined();
    expect(_fakeCategoriaRepository.findById).toHaveBeenCalled();
    expect(_fakeCategoriaRepository.findById).toHaveBeenCalledTimes(1);
    expect(_fakeCategoriaRepository.findById).toHaveBeenCalledWith(categoria_id);
  });

  test("find a categoria by name", async () => {
		const params = {
			nombre_corto: created_categoria.nombre_corto
		}
    const [cate] = await categoriaService.find(params);
    expect(cate).toBeDefined();
		expect(cate.nombre_corto).toEqual(params.nombre_corto)
    expect(_fakeCategoriaRepository.findAll).toHaveBeenCalled();
  });

  test("should search for a categoria by name or description", async () => {
		const query = "a"
    const categories = await categoriaService.search(query);
    expect(categories).toBeDefined();
		expect(categories.length).toBeGreaterThan(0)
    expect(_fakeCategoriaRepository.findAll).toHaveBeenCalled();
  });
  test("should return an empty array whe there is no macthes", async () => {
		const query = "b"
    const categories = await categoriaService.search(query);
    expect(categories).toBeDefined();
		expect(categories).toHaveLength(0)
    expect(_fakeCategoriaRepository.findAll).toHaveBeenCalled();
  });

  test("Categoria not found", async () => {
    try {
      const wrongId = "2";
      await categoriaService.getById(wrongId);
    } catch (error) {
      if (!(error instanceof Error)) return;
      expect(_fakeCategoriaRepository.findById).toThrow();
      expect(_fakeCategoriaRepository.findById).toThrowError();
      expect(error.message).toMatch(/not found/i);
    }
  });

	test("Remove a categoria by its ID", async () => {
    const result: boolean = await categoriaService.remove(categoria_id);
    expect(result).toBeDefined();
		expect(result).toBeTruthy()
    expect(_fakeCategoriaRepository.remove).toHaveBeenCalled();
    expect(_fakeCategoriaRepository.remove).toHaveBeenCalledTimes(1);
    expect(_fakeCategoriaRepository.remove).toHaveBeenCalledWith(categoria_id);
  });

  test("Categoria not found", async () => {
    try {
      const wrongId = "2";
      await categoriaService.remove(wrongId);
    } catch (error) {
      if (!(error instanceof Error)) return;
      expect(_fakeCategoriaRepository.remove).toThrow();
      expect(_fakeCategoriaRepository.remove).toThrowError();
      expect(error.message).toMatch(/not found/i);
    }
  });

  test("update a categoria", async () => {
		const dataUpdateDto = {
			nombre_categoria: "Categoria G"
		}
      const updateDto = UpdateCategoriaDto.create(dataUpdateDto);
      const cate: Categoria = await categoriaService.updateCategoria(
        categoria_id,
         updateDto
      );
    expect(cate).toBeDefined();
    expect(cate.nombre_categoria.length).toEqual(dataUpdateDto.nombre_categoria.length);
    expect(cate.nombre_categoria).toContain(dataUpdateDto.nombre_categoria);
    expect(_fakeCategoriaRepository.update).toHaveBeenCalled();
    expect(_fakeCategoriaRepository.update).toHaveBeenCalledTimes(1);
    expect(_fakeCategoriaRepository.update).toHaveBeenCalledWith(
      categoria_id,
      updateDto
    );
  });
  test("updateCategoria should throw an error when categoria does not exist", async () => {
    try {
      const dataUpdateDto = {
         nombre_categoria: "Categoria ABC",
      };

      const wrongId = "123";
      const updateDto = UpdateCategoriaDto.create(dataUpdateDto);
      await categoriaService.updateCategoria(wrongId, updateDto);
    } catch (error) {
      if (!(error instanceof Error)) return;
      expect(_fakeCategoriaRepository.update).toThrow();
      expect(_fakeCategoriaRepository.update).toThrowError();
      expect(error.message).toMatch(/not found/i);
    }
  });

    test("should retrieve all the products", async () => {
      const categorias: Categoria[] = await categoriaService.getAllCategorias();
      expect(categorias).toBeDefined();
			expect(categorias).toHaveLength(1)
      expect(_fakeCategoriaRepository.findAll).toHaveBeenCalled();
      expect(_fakeCategoriaRepository.findAll).toHaveBeenCalledTimes(1);
    });
	
	})
});
