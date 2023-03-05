import { IUDgenerator } from "@src/libs/UIDgenerator/IUIDgenerator";
import { UIDgenerator } from "@src/libs/UIDgenerator/uid-generator";
import { Entity } from "../Entity";
import { UserProps, UserRoles } from "./user-props";

const IDgenerator: IUDgenerator = UIDgenerator.create();

export class User extends Entity<UserProps> {
  private constructor(props: UserProps, id?: string) {
    super({ ...props }, !id ? IDgenerator.gen() : id);
  }

  static create(
    { id, ...props }: UserProps
  ): User {
    const instance = new User({ ...props }, id);
    return instance;
  }

  public get id(): string {
    return this._id;
  }

  public get user(): string {
    return this.props.user;
  }

  public get password(): string {
    return this.props.password;
  }

	public get role(): UserRoles {
		return this.props.role;
	}


	public getProps(): UserProps {
		return this.props
	}

}
