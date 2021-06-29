import { Request, Response } from "express";

import { UsersRepository } from "../repositories/UsersRepository";

import { CreateUserService } from "../services/CreateUserService";
import { GetAllUsersService } from "../services/GetAllUsersService";
import { DeleteUserService } from "../services/DeleteUserService";
import { GetUserService } from "../services/GetUserService";
import { UpdateUserService } from "../services/UpdateUserService";

const usersRepository = new UsersRepository();

export class UsersController {
  create(request: Request, response: Response) {
    const { name, email, pictureUrl } = request.body;

    const createUser = new CreateUserService(usersRepository);

    const user = createUser.execute({ email, name, pictureUrl });

    return response.json(user);
  }

  index(request: Request, response: Response) {
    const { page, limitPerPage } = request.query;
    const getAllUsers = new GetAllUsersService(usersRepository);

    const users = getAllUsers.execute({
      page: Number(page),
      limitPerPage: Number(limitPerPage),
    });

    return response.json(users);
  }

  delete(request: Request, response: Response) {
    const { id } = request.params;

    const deleteUser = new DeleteUserService(usersRepository);

    const isUserDeleted = deleteUser.execute({ id });

    if (!isUserDeleted) {
      return response.json({ message: "error while delete the user" });
    }
    return response.json({ message: "user deleted with success" });
  }

  find(request: Request, response: Response) {
    const { id } = request.params;

    const getUser = new GetUserService(usersRepository);

    const user = getUser.execute({ id });

    return response.json(user);
  }

  update(request: Request, response: Response) {
    const { id } = request.params;
    const { name, email, pictureUrl } = request.body;

    const updateUser = new UpdateUserService(usersRepository);

    const user = updateUser.execute({ email, id, name, pictureUrl });

    return response.json(user);
  }
}
