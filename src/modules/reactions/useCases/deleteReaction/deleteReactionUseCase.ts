import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IReactionsRepositories } from "@modules/reactions/iRepositories/IReactionsRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest {
  usrId: string;
  id: string;
}

@injectable()
class DeleteReactionUseCase {
  constructor(
    @inject("ReactionRepsitory")
    private reactionRepository: IReactionsRepositories,
    @inject("UuidProvider")
    private uuidorvider: IUuidProvider
  ) {}

  async execute({ usrId, id }: IRequest): Promise<AppResponse> {
    if (!this.uuidorvider.validateUUID(id)) {
      throw new AppError({
        message: "ID é inválido",
      });
    }

    const listReactionById = await this.reactionRepository.listById(id);

    if (!listReactionById) {
      throw new AppError({
        message: "Reação não encontrada!",
      });
    }

    if (usrId !== listReactionById.user_id) {
      throw new AppError({
        statusCode: 401,

        message: "Operação não permitida!",
      });
    }

    await this.reactionRepository.delete(id);

    return new AppResponse({
      message: "Reação removida com suceso!",
    });
  }
}

export { DeleteReactionUseCase };
