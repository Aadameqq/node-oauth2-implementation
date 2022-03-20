import { Account } from "../entities/Account";

export interface IUpdateNicknameAccountRepository {
  updateNickname: (id: string, nickname: string) => Promise<Account | null>;
}
