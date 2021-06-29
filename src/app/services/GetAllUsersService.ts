import { IUsersRepository } from "../implementations/IUsersRepository";
import { IFindAllResponseDTO } from "../dtos/IFindAllDTO";

interface IRequest {
  page: number;
  limitPerPage: number;
}

export class GetAllUsersService {
  constructor(private usersRepository: IUsersRepository) {}
  public execute({ limitPerPage, page }: IRequest): IFindAllResponseDTO {
    const allUsers = this.usersRepository.findAll({ page, limitPerPage });

    return allUsers;
  }
}
