import { CreateUserSessionController } from "@modules/sessions/useCases/createUserSession/createUserSessionController";
import { Router } from "express";

const sessionRoutes = Router();

sessionRoutes.post("/", new CreateUserSessionController().handle);

export { sessionRoutes };
