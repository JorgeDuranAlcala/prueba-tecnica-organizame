import { UserService } from "./user-service";
import { inMemoryUserRepo } from "@src/infrastructure/userRepository";

export const userService = UserService.create(inMemoryUserRepo);
