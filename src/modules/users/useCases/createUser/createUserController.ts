import { Request, Response } from "express";
import { CreateUserUseCase } from "./createUserUseCase";
import { IRequestCreateUser } from "../../dto/users";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const { 
      name, 
      email,
      confirmEmail,
      password,
      confirmPasword,
      telephone,
      birthDate
    } = request.body as IRequestCreateUser;

    console.log();

    const createUserCase = new CreateUserUseCase();

    const result = await createUserCase.execute({
      name, 
      email,
      confirmEmail,
      password,
      confirmPasword,
      telephone,
      birthDate
    });

    response.json ({ msg: "Olá Mundo!"});
  }
}

export { CreateUserController };