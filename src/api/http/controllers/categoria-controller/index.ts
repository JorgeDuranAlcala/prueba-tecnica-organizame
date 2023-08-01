import { categoriaService } from "@src/application/Services/Categoria";
import { Validator } from "@src/libs/Validator/validator";
import { CategoriaController } from "./Categoria-controller";

const validator = new Validator();

const my_categoriaController = new CategoriaController(
  categoriaService,
  validator
);
export { my_categoriaController };
