import { Account } from "../entities/Account";

export interface ICreateAccountRepository {
  create: (accountEntity: Account) => Promise<Account>;
}
