import { LoginUserDto } from "@src/domain/User/dtos/login-dto";
import { ReturnUserDto } from "@src/domain/User/dtos/returnUser-dto";

export interface IUserService {
  login(loginUserDto: LoginUserDto): Promise<ReturnUserDto>;
}
