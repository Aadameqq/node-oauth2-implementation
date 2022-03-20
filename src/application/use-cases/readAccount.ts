import { IReadAccountRepository } from "../../domain/interfaces/IReadAccountRepository";
import { IReadAccountByIdRepository } from "../../domain/interfaces/IReadAccountByIdRepository";

export interface IReadAccountProps {
  id: string;
}

export const readAccount = async (
  accountRepository: IReadAccountByIdRepository,
  { id }: IReadAccountProps
) => {
  const account = await accountRepository.readById(id);

  if (!account) return { error: true };

  return { account };
};
