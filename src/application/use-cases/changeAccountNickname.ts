import { Account } from "../../domain/entities/Account";
import { IUpdateNicknameAccountRepository } from "../../domain/interfaces/IUpdateNicknameAccountRepository";

export interface CreateAccountProps {
  nickname: string;
  id: string;
}

export const changeAccountNickname = async (
  accountRepository: IUpdateNicknameAccountRepository,
  { nickname, id }: CreateAccountProps
) => {
  const updatedAccount = await accountRepository.updateNickname(id, nickname);

  if (!updatedAccount) return { error: true };

  return { updatedAccount };
};
