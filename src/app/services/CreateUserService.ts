import { AppError } from "../errors/AppError";
import { IUsersRepository } from "../implementations/IUsersRepository";
import { User } from "../models/User";

interface IRequest {
  name: string;
  email: string;
  pictureUrl: string;
}

export class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}
  public execute({ name, email, pictureUrl }: IRequest): User {
    const checkUserExists = this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError("e-mail address already used", 400);
    }

    const user = this.usersRepository.create({
      name,
      email,
      pictureUrl,
    });

    return user;
  }
}
