import { productService } from "@src/application/Services/Product";
import { Validator } from "@src/libs/Validator/validator";
import { CsvConverter } from "@src/libs/csv-converter/";
import { ProductController } from "./product-controller";

const validator = new Validator();
const csv_converter = new CsvConverter();

const my_productController = new ProductController(
  productService,
  validator,
  csv_converter
);
export { my_productController };
