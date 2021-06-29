import { AppError } from "../errors/AppError";
import { IUsersRepository } from "../implementations/IUsersRepository";

interface IRequest {
  id: string;
}

export class DeleteUserService {
  constructor(private usersRepository: IUsersRepository) {}
  public execute({ id }: IRequest): boolean {
    const checkUserExists = this.usersRepository.findById(id);

    if (!checkUserExists) {
      throw new AppError("user not found", 400);
    }

    const isDeletedUser = this.usersRepository.delete(id);

    return isDeletedUser;
  }
}
