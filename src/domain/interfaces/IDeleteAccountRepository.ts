import { Account } from "../entities/Account";

export interface IDeleteAccountRepository {
  delete: (id: string) => Promise<Account | null>;
}
