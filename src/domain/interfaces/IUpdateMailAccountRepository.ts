import { Account } from "../entities/Account";

export interface IUpdateMailAccountRepository {
  updateMail: (id: string, mail: string) => Promise<Account | null>;
}
