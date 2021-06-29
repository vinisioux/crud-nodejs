import { AppError } from "../errors/AppError";
import { IUsersRepository } from "../implementations/IUsersRepository";
import { User } from "../models/User";

interface IRequest {
  id: string;
}

export class GetUserService {
  constructor(private usersRepository: IUsersRepository) {}
  public execute({ id }: IRequest): User {
    const user = this.usersRepository.findById(id);

    if (!user) {
      throw new AppError("user not found", 400);
    }

    return user;
  }
}
