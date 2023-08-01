import { UserController } from "./user-controller";
import { Validator } from "@src/libs/Validator/validator";
import { userService } from "@src/application/Services/User";

const validator = Validator.create();
export const userController = new UserController(userService, validator);
