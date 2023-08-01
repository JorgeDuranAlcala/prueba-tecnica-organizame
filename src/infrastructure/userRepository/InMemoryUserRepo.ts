import { User } from "@src/domain/User";
import { UserProps } from "@src/domain/User/user-props";
import { InMemoryDatabase } from "../database/In-memory";
import { UserRepository } from "./IUserRepo";

export class InMemoryUserRepo implements UserRepository {
  constructor(private readonly _database: InMemoryDatabase) {
    this._database = _database;
    this._database.users.insertMany(
      User.create({ user: "user", password: "1234", role: "user" }),
      User.create({ user: "admin", password: "4321", role: "admin" })
    );
  }

  async find({
    user,
    password,
  }: Partial<UserProps>): Promise<User | undefined> {
    const users = this._database.users.findAll();
    return users.find((x) => x?.user === user && x?.password === password);
  }
}
