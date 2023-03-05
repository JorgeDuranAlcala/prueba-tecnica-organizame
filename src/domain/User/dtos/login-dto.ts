
import { Exclude, Expose } from "class-transformer";
import { IsNotEmpty, IsString } from "class-validator";

export interface ILoginUserDto {
  user: string;
  password: string;
}

@Exclude()
export class LoginUserDto implements ILoginUserDto {
  @Expose()
  @IsNotEmpty()
  @IsString()
  public user: string;

	@Expose()
  @IsNotEmpty()
  @IsString()
  public password: string;

	static create({
		user,
		password
	}: ILoginUserDto) {
    return new LoginUserDto(
			user,
			password
		);
  }

  constructor(
		user: string,
		password: string
	) {
    this.user = user;
		this.password = password;
  }
}


