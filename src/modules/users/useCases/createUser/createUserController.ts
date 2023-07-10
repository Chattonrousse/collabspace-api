import { container } from "tsyringe";
import { Request, Response } from "express";
import { CreateUserUseCase } from "./createUserUseCase";
import { IRequestCreateUser } from "../../dtos/users";

class CreateUserController {
  async handle(request: Request, response: Response) {
    const {
      name,
      email,
      confirmEmail,
      password,
      confirmPassword,
      telephone,
      birthDate,
    } = request.body as IRequestCreateUser;

    console.log();

    const createUserCase = container.resolve(CreateUserUseCase);

    const result = await createUserCase.execute({
      name,
      email,
      confirmEmail,
      password,
      confirmPassword,
      telephone,
      birthDate,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { CreateUserController };
