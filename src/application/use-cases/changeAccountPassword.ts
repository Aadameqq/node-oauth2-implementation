import { Account } from "../../domain/entities/Account";
import { IHashPasswordHasher } from "../../domain/interfaces/IHashPasswordHasher";
import { IUpdatePasswordAccountRepository } from "../../domain/interfaces/IUpdatePasswordAccountRepository";

export interface ChangeAccountPasswordProps {
  id: string;
  password: string;
}

export const changeAccountPassword = async (
  accountRepository: IUpdatePasswordAccountRepository,
  passwordHasher: IHashPasswordHasher,
  { password, id }: ChangeAccountPasswordProps
) => {
  const hash = await passwordHasher.hash(password);

  const updatedAccount = await accountRepository.updatePassword(id, hash);

  if (!updatedAccount) return { error: true };
  return { success: true };
};
