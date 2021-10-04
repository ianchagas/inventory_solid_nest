import { CreateUserDTO } from '../dto/request/create-user.dto';
import { UserEntity } from '../infra/typeORM/entities/user.entity';

interface IUserRepository {
  create(data: CreateUserDTO): Promise<UserEntity>;
}

export { IUserRepository };
