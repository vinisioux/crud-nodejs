import { IUsersRepository } from "../implementations/IUsersRepository";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUpdateUserDTO } from "../dtos/IUpdateUserDTO";
import { IFindAllRequestDTO, IFindAllResponseDTO } from "../dtos/IFindAllDTO";

import { User } from "../models/User";
import { v4 } from "uuid";

export class UsersRepository implements IUsersRepository {
  private users: User[] = [];

  public findAll({
    limitPerPage,
    page,
  }: IFindAllRequestDTO): IFindAllResponseDTO {
    const users = this.users.slice(
      (page - 1) * limitPerPage,
      page * limitPerPage
    );

    const totalUsers = this.users.length;

    return {
      users,
      totalUsers,
    };
  }

  public findById(id: string): User | undefined {
    const user = this.users.find((user) => user.id === id);

    return user;
  }

  public findByEmail(email: string): User | undefined {
    const user = this.users.find((user) => user.email === email);

    if (!user) return undefined;

    return user;
  }

  public create(userData: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, { id: v4() }, userData);

    this.users.push(user);

    return user;
  }

  public delete(id: string): boolean {
    const userIndex = this.users.findIndex((user) => user.id === id);

    if (userIndex === -1) return false;

    this.users.splice(userIndex, 1);

    return true;
  }

  public update({ id, email, name, pictureUrl }: IUpdateUserDTO): User {
    const user = this.users.find((user) => user.id === id);

    user.name = name;
    user.email = email;
    user.pictureUrl = pictureUrl;

    return user;
  }
}
