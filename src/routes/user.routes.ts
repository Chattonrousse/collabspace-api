import { CreateUserController } from "@modules/users/useCases/createUser/createUserController";
import { InactivateUserController } from "@modules/users/useCases/inactiveUser/InactivateUserController";
import { UpdateUserController } from "@modules/users/useCases/updateUsers/updateUserControler";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/", new CreateUserController().handle);
userRoutes.put("/:id", new UpdateUserController().handle);
userRoutes.delete("/:id", new InactivateUserController().handle);

export { userRoutes };
