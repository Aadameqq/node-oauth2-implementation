import { Account } from "../../domain/entities/Account";
import { IUpdateMailAccountRepository } from "../../domain/interfaces/IUpdateMailAccountRepository";

export interface UpdateAccountMailProps {
  mail: string;
  id: string;
}

export const changeAccountMail = async (
  accountRepository: IUpdateMailAccountRepository,
  { mail, id }: UpdateAccountMailProps
) => {
  const updatedAccount = await accountRepository.updateMail(id, mail);

  if (!updatedAccount) return { error: true };

  return { success: true };
};
