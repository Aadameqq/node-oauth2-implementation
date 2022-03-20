import { Account } from "../entities/Account";

export interface IReadAccountByIdRepository {
  readById: (id: string) => Promise<Account | null>;
}
