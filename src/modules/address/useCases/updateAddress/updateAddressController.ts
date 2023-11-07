import { IRequestUpdateAddress } from "@modules/address/dtos/address";
import { Request, Response } from "express";
import { UpdateAddressUseCase } from "./updateAddressUseCase";
import { container } from "tsyringe";

class UpdateAddressController {
  async handle(request: Request, response: Response) {
    const usrId = request.usrId;
    const { id } = request.params as { id: string };
    const { cep, country, province, city, street } =
      request.body as IRequestUpdateAddress;

    const updateAddressUseCase = container.resolve(UpdateAddressUseCase);

    const result = await updateAddressUseCase.execute({
      usrId,
      id,
      cep,
      country,
      province,
      city,
      street,
    });

    return response.status(result.statusCode).json(result);
  }
}

export { UpdateAddressController };
