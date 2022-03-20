import { Account } from "../../domain/entities/Account";
import { IDeleteAccountRepository } from "../../domain/interfaces/IDeleteAccountRepository";

export interface DeleteAccountProps {
  id: string;
}

export const deleteAccount = async (
  accountRepository: IDeleteAccountRepository,
  { id }: DeleteAccountProps
) => {
  const deletedAccount = await accountRepository.delete(id);

  if (!deletedAccount) return { error: true };

  return { success: true };
};
