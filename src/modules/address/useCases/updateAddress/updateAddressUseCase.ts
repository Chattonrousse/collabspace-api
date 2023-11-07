import { AppError } from "@helpers/errorsHandler";
import { AppResponse } from "@helpers/responseParser";
import { IRequestUpdateAddress } from "@modules/address/dtos/address";
import { IAddressRepositories } from "@modules/address/iRepositories/IAddressRepositories";
import { IUuidProvider } from "@shared/container/providers/uuidProvider/IUuidProvider";
import { inject, injectable } from "tsyringe";

interface IRequest extends IRequestUpdateAddress {
  id: string;
  usrId: string;
}

@injectable()
class UpdateAddressUseCase {
  constructor(
    @inject("AddressRepository")
    private addressRepository: IAddressRepositories,
    @inject("UuidProvider")
    private uuidProvider: IUuidProvider
  ) {}

  async execute({
    id,
    usrId,
    cep,
    country,
    province,
    city,
    street,
  }: IRequest): Promise<AppResponse> {
    if (!this.uuidProvider.validateUUID(id)) {
      throw new AppError({
        message: "ID inválido!",
      });
    }

    const listAddressById = await this.addressRepository.listAddressById(id);

    if (!listAddressById) {
      throw new AppError({
        message: "Endereço não encontrado!",
      });
    }

    if (usrId !== listAddressById.user_id) {
      throw new AppError({
        message: "Operação não permitida!",
      });
    }

    await this.addressRepository.update({
      id,
      cep,
      country,
      province,
      city,
      street,
    });

    return new AppResponse({
      message: "Endereço editado com sucesso!",
    });
  }
}

export { UpdateAddressUseCase };
