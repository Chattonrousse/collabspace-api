import { Router } from "express";

import { CreateUserController } from "@modules/users/useCases/createUser/createUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUsers/updateUserController";
import { InactivateUserController } from "@modules/users/useCases/inactivateUser/InactivateUserController";

import { authentication } from "src/middlewares/authentication";

const userRoutes = Router();

userRoutes.post("/", new CreateUserController().handle);

userRoutes.use(authentication);

userRoutes.put("/", new UpdateUserController().handle);
userRoutes.delete("/", new InactivateUserController().handle);

export { userRoutes };
