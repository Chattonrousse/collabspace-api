import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IFriendsRepositories } from "@modules/friends/iRepositories/IFriendsRepoitories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { EnumFriendsActions } from "src/enums/friendsActions";
import { inject, injectable } from "tsyringe";

interface IRequest {
  usrId: string;
  id: string;
}

@injectable()
class DeleteFriendUseCase {
  constructor(
    @inject("FriendRepository")
    private friendRepository: IFriendsRepositories,
    @inject("UuidProvider")
    private uuidProvder: IUuidProvider
  ) {}

  async execute({ usrId, id }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvder.validateUUID(id)) {
      throw new AppError({
        message: "ID inválido!",
      });
    }

    const listFriendById = await this.friendRepository.listById(id);

    if (!listFriendById) {
      throw new AppError({
        message: "Amizade não encontrada!",
      });
    }

    if (
      usrId !== listFriendById.user_id_1 &&
      usrId !== listFriendById.user_id_2
    ) {
      throw new AppError({
        statusCode: 401,
        message: "Operação não permitida!",
      });
    }

    if (
      listFriendById.action_id_1 !== EnumFriendsActions.requested ||
      listFriendById.action_id_2 !== EnumFriendsActions.accepted
    ) {
      throw new AppError({
        message: "Amizade não aceita, cancelada ou recusada!",
      });
    }

    return new AppResponse({
      message: "Amizade desfeita com sucesso!",
    });
  }
}

export { DeleteFriendUseCase };
