import { Router } from "express";
import { userRoutes } from "./user.routes";
import { sessionRoutes } from "./sessionsroutes";

const router = Router();

router.use("/users", userRoutes);
router.use("/sessions", sessionRoutes);

export { router };
