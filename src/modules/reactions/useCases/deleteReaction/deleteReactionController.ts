import { Request, Response } from "express";
import { DeleteReactionUseCase } from "./deleteReactionUseCase";
import { container } from "tsyringe";

class DeleteReactionController {
  async handle(request: Request, response: Response) {
    const { usrId } = request;
    const { id } = request.params as { id: string };

    const deleteReactionUseCase = container.resolve(DeleteReactionUseCase);

    const result = await deleteReactionUseCase.execute({
      usrId,
      id,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { DeleteReactionController };
