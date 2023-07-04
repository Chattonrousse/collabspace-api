import "./providers";
import { container } from "tsyringe";

import { IUsersRepositories } from "@modules/users/iRepositories/IUsersRepositories";
import { UserRespository } from "@modules/users/repositories/UserRepository";

console.log(UserRespository);


container.registerSingleton<IUsersRepositories>(
  "UserRepository",
  UserRespository
);
