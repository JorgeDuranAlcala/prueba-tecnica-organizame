import { inMemoryProductRepo } from "@src/infrastructure/productRepository";
import { inMemoryCategoriaRepo } from "@src/infrastructure/categoriaRepository";
import { ProductService } from "./product-service";

const repo = inMemoryProductRepo;
const categoriaRepo = inMemoryCategoriaRepo;
const productService = ProductService.create(repo, categoriaRepo);
export { productService };
