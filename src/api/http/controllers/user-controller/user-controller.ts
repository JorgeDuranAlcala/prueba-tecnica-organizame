import { BaseController  } from '../base-controller'
import {  IUserController } from './IUserController'
import { LoginUserDto, ReturnUserDto  } from '@src/domain/User/dtos'
import { IUserService  } from '@src/application/Services/User/IUserService'
import { IValidator  } from '@src/libs/Validator/IValidator'
import { NextFunction, Request, Response } from "express";

export class UserController extends BaseController implements IUserController {
	private readonly _userService: IUserService;
	private readonly _validator: IValidator;

	constructor(
			userService: IUserService,
			_validator: IValidator,
	) {
		super()
		this._userService = userService;
		this._validator = _validator;
	}


	login =   async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<Response | void> => {
    try {
      const loginUserDto = this.bodyParser(
        LoginUserDto,
        req.body as Record<string, unknown>
      );
      await this._validator.validate(loginUserDto);
      const user = await this._userService.login(loginUserDto);
			const userData = this.transformToPlainObj(user)
      return this.ok(res, { user: userData });
    } catch (error) {
      if (!(error instanceof Error)) return;
      next(error);
    }
  };

}
