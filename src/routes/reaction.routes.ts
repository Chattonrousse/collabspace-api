import { Router } from "express";

import { CreateReactionController } from "@modules/reactions/useCases/createReaction/createReactionController";

import { authentication } from "src/middlewares/authentication";
import { DeleteCommentController } from "@modules/comments/useCases/deleteComment/deleteCommentController";

const reactionRoutes = Router();

reactionRoutes.use(authentication);

reactionRoutes.post("/", new CreateReactionController().handle);
reactionRoutes.delete("/:id", new DeleteCommentController().handle);

export { reactionRoutes };
