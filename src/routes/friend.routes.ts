import { AcceptRequestController } from "@modules/friends/useCases/acceptRequest/acceptRequestController";
import { CancelRequestController } from "@modules/friends/useCases/cancelRequest/cancelRequestController";
import { CreateFriendController } from "@modules/friends/useCases/createFriend/createFriendController";
import { DeleteFriendController } from "@modules/friends/useCases/deleteFriend/deleteFriendController";
import { ListAllFriendsByUserController } from "@modules/friends/useCases/getAllFriendsByUser/listAllFriendsByUserController";
import { RecuseRequestController } from "@modules/friends/useCases/recuseRquest/recuseRequestController";

import { Router } from "express";

import { authentication } from "src/middlewares/authentication";

const friendRoutes = Router();

friendRoutes.use(authentication);

friendRoutes.get(
  "/listAllFriends",
  new ListAllFriendsByUserController().handle
);

friendRoutes.post("/:targetId", new CreateFriendController().handle);
friendRoutes.patch("/cancelRequest/:id", new CancelRequestController().handle);
friendRoutes.patch("/acceptRequest/:id", new AcceptRequestController().handle);
friendRoutes.patch("/recuseRequest/:id", new RecuseRequestController().handle);
friendRoutes.delete("/deleteFriend/:id", new DeleteFriendController().handle);

export { friendRoutes };
