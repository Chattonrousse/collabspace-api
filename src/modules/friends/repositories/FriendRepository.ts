import { prisma } from "@libs/prismaClient";
import {
  ICreateFriend,
  IFriend,
  IListAllFriendsByUser,
  IUpdateActionStatus,
} from "../dtos/friends";
import { IFriendsRepositories } from "../iRepositories/IFriendsRepoitories";
import { EnumFriendsActions } from "src/enums/friendsActions";

class FriendRepository implements IFriendsRepositories {
  create({ id, userId1, userId2 }: ICreateFriend): Promise<IFriend> {
    return prisma.friends.create({
      data: {
        id,
        user_id_1: userId1,
        user_id_2: userId2,
      },
    });
  }

  listById(id: string): Promise<IFriend | null> {
    return prisma.friends.findFirst({
      where: { id },
    });
  }

  listAlreadyExists(userId1: string, userId2: string): Promise<IFriend | null> {
    return prisma.friends.findFirst({
      where: {
        user_id_1: userId1,
        user_id_2: userId2,
      },
    });
  }

  listAllByUser(id: string): Promise<IListAllFriendsByUser[]> {
    return prisma.friends.findMany({
      where: {
        OR: [
          {
            user_id_1: id,
          },
          {
            user_id_2: id,
          },
        ],
        AND: [
          {
            action_id_1: EnumFriendsActions.requested,
          },
          {
            action_id_2: EnumFriendsActions.accepted,
          },
        ],
      },
      select: {
        id: true,
        users_friends_user_id_1Tousers: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
        users_friends_user_id_2Tousers: {
          select: {
            id: true,
            name: true,
            avatar_url: true,
          },
        },
        created_at: true,
      },
    });
  }

  async updateActionStatus({
    id,
    actionId1,
    actionId2,
  }: IUpdateActionStatus): Promise<void> {
    await prisma.friends.update({
      where: { id },
      data: {
        action_id_1: actionId1,
        action_id_2: actionId2,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.friends.delete({
      where: { id },
    });
  }
}

export { FriendRepository };
