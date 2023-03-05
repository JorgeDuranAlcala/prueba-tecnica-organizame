import { User  } from '@src/domain/User'
import { UserProps  } from '@src/domain/User/user-props'
import { UserRepository } from "@src/infrastructure/userRepository/IUserRepo";

const _fakedb: User[] = [
	User.create({ user: 'user', password: "1234", role: "user"  }),
	User.create({ user: 'admin', password: "4321", role: 'admin'  })

];

export class FakeUserRepo implements UserRepository {

	find = jest.fn().mockImplementation(
						({ user, password  }: Partial<UserProps>) => {
							const userFound = _fakedb.find(u => u?.user === user && u?.password === password)
							return Promise.resolve(userFound)
						}
					)

}
