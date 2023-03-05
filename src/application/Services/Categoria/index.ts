import { inMemoryCategoriaRepo  } from "@src/infrastructure/categoriaRepository"
import { CategoriaService } from "./categoria-service";

const categoriaRepo = inMemoryCategoriaRepo;
const categoriaService = CategoriaService.create(categoriaRepo);
export { categoriaService };
