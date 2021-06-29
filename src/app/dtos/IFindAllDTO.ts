import { User } from "../models/User";

export interface IFindAllRequestDTO {
  page: number;
  limitPerPage: number;
}

export interface IFindAllResponseDTO {
  users: User[];
  totalUsers: number;
}
