import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListAllPostsUseCase } from "./listAllPostsUseCase";

class ListAllPostsController {
  async handle(request: Request, response: Response) {
    const listAllPostsUseCase = container.resolve(ListAllPostsUseCase);

    const result = await listAllPostsUseCase.execute();

    return response.status(result.statusCode).json(result);
  }
}

export { ListAllPostsController };
