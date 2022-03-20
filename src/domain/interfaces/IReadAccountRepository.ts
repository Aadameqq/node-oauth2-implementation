import { Account } from "../entities/Account";

export interface IReadAccountRepository {
  read: (nickname: string) => Promise<Account | null>;
}
