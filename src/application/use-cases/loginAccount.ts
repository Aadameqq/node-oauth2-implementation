import { Account } from "../../domain/entities/Account";
import { IComparePasswordHasher } from "../../domain/interfaces/IComparePasswordHasher";
import { IReadAccountRepository } from "../../domain/interfaces/IReadAccountRepository";

export interface LoginAccountProps {
  nickname: string;
  password: string;
}

export const loginAccount = async (
  accountRepository: IReadAccountRepository,
  passwordHasher: IComparePasswordHasher,
  { nickname, password }: LoginAccountProps
) => {
  const account = await accountRepository.read(nickname);

  if (!account) return { error: true };

  const { areEqual } = await passwordHasher.compare(password, account.password);

  if (!areEqual) return { error: true };

  return { error: false, payload: account };
};
