import { prisma } from "@libs/prismaClient";
import { IAddress, ICreateAddress, IUpdateAddress } from "../dtos/address";
import { IAddressRepositories } from "../iRepositories/IAddressRepositories";

class AddressRepository implements IAddressRepositories {
  create({
    id,
    userId,
    cep,
    country,
    province,
    city,
    street,
  }: ICreateAddress): Promise<IAddress> {
    return prisma.address.create({
      data: {
        id,
        user_id: userId,
        cep,
        country,
        province,
        city,
        street,
      },
      select: {
        id: true,
        user_id: true,
        cep: true,
        country: true,
        province: true,
        city: true,
        street: true,
      },
    });
  }

  listAddressById(id: string): Promise<IAddress | null> {
    return prisma.address.findFirst({
      where: { id },
    });
  }

  async update({
    id,
    cep,
    country,
    province,
    city,
    street,
  }: IUpdateAddress): Promise<void> {
    await prisma.address.update({
      where: { id },
      data: {
        cep,
        country,
        province,
        city,
        street,
      },
    });
  }
}

export { AddressRepository };
