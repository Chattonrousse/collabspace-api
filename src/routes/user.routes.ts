import { CreateUserController } from "@modules/users/useCases/createUser/createUserController";
import { Router } from "express";

const userRoutes = Router();

userRoutes.post("/", new CreateUserController().handle);

export {userRoutes};
