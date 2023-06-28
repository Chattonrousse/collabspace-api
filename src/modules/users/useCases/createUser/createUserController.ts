import { Request, Response } from "express";
import { CreateUserUserCase } from "./createUserUseCase";

class CreateUserController {
  async handle(req: Request, res: Response) {
    const createUserUserCase = new CreateUserUserCase();

    createUserUserCase.execute();

    res.json ({ msg: "Olá Mundo!"});
  }
}

export { CreateUserController };