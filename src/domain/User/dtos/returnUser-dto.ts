import { Exclude, Expose } from "class-transformer";
import { UserRoles } from "@src/domain/User/user-props";

export interface IReturnUserDto {
  user: string;
  password: string;
  role: UserRoles;
}

@Exclude()
export class ReturnUserDto implements IReturnUserDto {
  @Expose()
  public user: string;

  public password: string;

  @Expose()
  public role: UserRoles;

  static create({ user, password, role }: IReturnUserDto) {
    return new ReturnUserDto(user, password, role);
  }

  private constructor(user: string, password: string, role: UserRoles) {
    this.password = password;
    this.user = user;
    this.role = role;
  }
}
