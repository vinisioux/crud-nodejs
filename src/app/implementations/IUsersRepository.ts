import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IFindAllRequestDTO, IFindAllResponseDTO } from "../dtos/IFindAllDTO";
import { User } from "../models/User";

export interface IUsersRepository {
  findById(id: string): User | undefined;
  findAll(data: IFindAllRequestDTO): IFindAllResponseDTO;
  findByEmail(email: string): User | undefined;
  create(data: ICreateUserDTO): User;
  delete(id: string): boolean;
  update(user: IUpdateUserDTO): User;
}
