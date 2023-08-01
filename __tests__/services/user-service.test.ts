import { UserService } from "../../src/application/Services/User/user-service";
import { IUserService } from "../../src/application/Services/User/IUserService";
import { UserRepository } from "../../src/infrastructure/userRepository/IUserRepo";
import { FakeUserRepo } from "../../src/libs/helper/FakeUserRepo";
import { LoginUserDto } from "../../src/domain/User/dtos/login-dto";
import { instanceToPlain } from "class-transformer";

describe("User service", () => {
  let userService: IUserService;
  let userRepo: UserRepository;

  beforeEach(() => {
    userRepo = new FakeUserRepo();
    userService = new UserService(userRepo);
  });

  test("should login a user", async () => {
    const loginUserDto = LoginUserDto.create({
      user: "user",
      password: "1234",
    });
    const returnDto = await userService.login(loginUserDto);
    const userData = instanceToPlain(returnDto);
    expect(userData?.password).not.toBeDefined();
    expect(userData.user).toBeDefined();
    expect(userData.role).toEqual("user");
  });
  test("should login a admin", async () => {
    const loginUserDto = LoginUserDto.create({
      user: "admin",
      password: "4321",
    });
    const returnDto = await userService.login(loginUserDto);
    const userData = instanceToPlain(returnDto);
    expect(userData?.password).not.toBeDefined();
    expect(userData.user).toBeDefined();
    expect(userData.role).toEqual("admin");
  });
  test("should throw error when bad credentials are passed in", async () => {
    try {
      const loginUserDto = LoginUserDto.create({
        user: "user",
        password: "44##%%%",
      });
      await userService.login(loginUserDto);
    } catch (error) {
      if (!(error instanceof Error)) return;
      expect(error.message).toMatch(/user or password are invalid/i);
    }
  });
});
