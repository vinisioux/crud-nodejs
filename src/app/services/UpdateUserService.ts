import { AppError } from "../errors/AppError";
import { IUsersRepository } from "../implementations/IUsersRepository";
import { User } from "../models/User";

interface IRequest {
  id: string;
  name: string;
  email: string;
  pictureUrl: string;
}

export class UpdateUserService {
  constructor(private usersRepository: IUsersRepository) {}
  public execute({ id, name, email, pictureUrl }: IRequest): User {
    const checkUserExists = this.usersRepository.findById(id);

    if (!checkUserExists) {
      throw new AppError("user not found", 400);
    }

    const user = this.usersRepository.update({
      id,
      name,
      email,
      pictureUrl,
    });

    return user;
  }
}
