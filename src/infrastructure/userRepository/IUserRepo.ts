import { User } from "@src/domain/User";
import { UserProps } from "@src/domain/User/user-props";

export interface UserRepository {
  find(props: Partial<UserProps>): Promise<User | undefined>;
}
