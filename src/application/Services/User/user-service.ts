import { LoginUserDto } from "@src/domain/User/dtos/login-dto";
import { IUserService } from "./IUserService";
import { UserRepository } from "@src/infrastructure/userRepository/IUserRepo";
import { ReturnUserDto } from "@src/domain/User/dtos/returnUser-dto";
import { LoginUser } from "./Use-cases/LoginUser";

export class UserService implements IUserService {
  private readonly _userRepo: UserRepository;

  constructor(_userRepo: UserRepository) {
    this._userRepo = _userRepo;
  }

  static create(_userRepo: UserRepository) {
    return new UserService(_userRepo);
  }

  async login(loginUserDto: LoginUserDto): Promise<ReturnUserDto> {
    return await LoginUser.create(this._userRepo).exec(loginUserDto);
  }
}
