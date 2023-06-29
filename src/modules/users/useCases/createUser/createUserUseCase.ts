import { IRequestCreateUser } from "../../dto/users";

class CreateUserUseCase {
  async execute({
    name, 
    email,
    confirmEmail,
    password,
    confirmPasword,
    telephone,
    birthDate
  } : IRequestCreateUser) {}
}

export { CreateUserUseCase }