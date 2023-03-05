import { UserRepository  } from '@src/infrastructure/userRepository/IUserRepo'
import { LoginUserDto  } from '@src/domain/User/dtos/login-dto'
import { ReturnUserDto  } from '@src/domain/User/dtos/returnUser-dto'
import { UnauthorizedError  } from '@src/libs/Error/Unauthorized'

export class LoginUser {

	private readonly _userRepo: UserRepository;

	static create(
		_userRepo: UserRepository
	) {
		return new LoginUser(_userRepo)
	}

	private constructor(	
	 _userRepo: UserRepository
	) {
    this._userRepo = _userRepo;
	}

	async exec(
		loginUserDto: LoginUserDto
	) {
	   const user = await this._userRepo.find(loginUserDto);
		 if (!user) throw UnauthorizedError.create("User or password are invalid");	
		 return ReturnUserDto.create(user)
	}

}
