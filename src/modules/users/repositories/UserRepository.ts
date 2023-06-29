import { prisma } from "@/libs/prismaClient";

import { ICreateUser, IUser } from "../dto/users";
import { IUsersRepositories } from "../iRepositories/IUsersRepositories";

class UserRespository implements IUsersRepositories {
  create({
    id,
    name,
    email,
    telephone,
    birthDate,
    password,
    avatarUrl,
  }: ICreateUser): Promise<IUser> {
    return prisma.users.create ({
      data: {
        id,
        name,
        email,
        telephone,
        birth_date: birthDate,
        password,
        avatar_url: avatarUrl,
      },
    });
  }
}

export{ UserRespository }