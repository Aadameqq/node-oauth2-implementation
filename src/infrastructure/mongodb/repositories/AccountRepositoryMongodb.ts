import { IReadAccountRepository } from "../../../domain/interfaces/IReadAccountRepository";
import AccountModel from "../models/AccountModel";
import { Account } from "../../../domain/entities/Account";
import { ICreateAccountRepository } from "../../../domain/interfaces/ICreateAccountRepository";
import { IReadAccountByIdRepository } from "../../../domain/interfaces/IReadAccountByIdRepository";
import { IUpdateNicknameAccountRepository } from "../../../domain/interfaces/IUpdateNicknameAccountRepository";

export class AccountRepositoryMongodb
  implements
    IReadAccountRepository,
    ICreateAccountRepository,
    IReadAccountByIdRepository,
    IUpdateNicknameAccountRepository
{
  read = async (nickname: string) => {
    const accountFromDatabase = await AccountModel.findOne({ nickname });
    if (!accountFromDatabase) return null;

    const account = new Account(
      accountFromDatabase.id,
      nickname,
      accountFromDatabase.password,
      accountFromDatabase.mail
    );

    return account;
  };

  async create(accountEntity: Account) {
    const accountFromDatabase = (await new AccountModel(
      accountEntity
    ).save()) as any;

    const account = new Account(
      accountFromDatabase.id,
      accountFromDatabase.nickname,
      accountFromDatabase.password,
      accountFromDatabase.mail
    );

    return account;
  }

  async readById(id: string): Promise<Account | null> {
    const accountFromDatabase = await AccountModel.findOne({ id });
    if (!accountFromDatabase) return null;

    const account = new Account(
      accountFromDatabase.id,
      accountFromDatabase.nickname,
      accountFromDatabase.password,
      accountFromDatabase.mail
    );

    return account;
  }

  async updateNickname(id: string, nickname: string): Promise<Account | null> {
    const accountFromDatabase = await AccountModel.findOneAndUpdate(
      { id },
      { nickname }
    );
    if (!accountFromDatabase) return null;

    const account = new Account(
      accountFromDatabase.id,
      nickname,
      accountFromDatabase.password,
      accountFromDatabase.mail
    );

    return account;
  }
}
