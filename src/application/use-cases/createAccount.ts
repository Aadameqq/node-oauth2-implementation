import { Account } from "../../domain/entities/Account";
import { IHashPasswordHasher } from "../../domain/interfaces/IHashPasswordHasher";
import { IGenerator } from "../../domain/interfaces/IGenerator";
import { ICreateAccountRepository } from "../../domain/interfaces/ICreateAccountRepository";

export interface CreateAccountProps {
  nickname: string;
  password: string;
  mail: string;
}

export const createAccount = async (
  accountRepository: ICreateAccountRepository,
  passwordHasher: IHashPasswordHasher,
  idGenerator: IGenerator,
  { nickname, password, mail }: CreateAccountProps
) => {
  const hashedPassword = await passwordHasher.hash(password);
  const id = idGenerator.generate();

  const account = new Account(id, nickname, hashedPassword, mail);

  const createdAccount = await accountRepository.create(account);

  return createdAccount;
};
