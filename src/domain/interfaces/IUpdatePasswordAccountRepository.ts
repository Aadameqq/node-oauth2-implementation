import { Account } from "../entities/Account";

export interface IUpdatePasswordAccountRepository {
  updatePassword: (id: string, password: string) => Promise<Account | null>;
}
