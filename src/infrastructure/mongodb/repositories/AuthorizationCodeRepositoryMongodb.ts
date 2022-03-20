import { ICreateAuthorizationCodeRepository } from "../../../domain/interfaces/ICreateAuthorizationCodeRepository";
import { AuthorizationCode } from "../../../domain/entities/AuthorizationCode";
import AuthCodeModel from "../models/AuthCodeModel";
import { IReadAndDeleteAuthorizationCodeRepository } from "../../../domain/interfaces/IReadAndDeleteAuthorizationCodeRepository";

export class AuthorizationCodeRepositoryMongodb
  implements
    ICreateAuthorizationCodeRepository,
    IReadAndDeleteAuthorizationCodeRepository
{
  async create(
    authorizationCodeEntity: AuthorizationCode
  ): Promise<AuthorizationCode> {
    const authCodeFromDatabase = await new AuthCodeModel(
      authorizationCodeEntity
    ).save();

    const authCode = new AuthorizationCode(
      authCodeFromDatabase.resourceOwnerId,
      authCodeFromDatabase.clientId,
      authCodeFromDatabase.code,
      authCodeFromDatabase.permissions
    );

    return authCode;
  }

  async readAndDelete(code: string): Promise<AuthorizationCode | null> {
    const authCodeFromDatabase = await AuthCodeModel.findOneAndDelete({ code });

    if (!authCodeFromDatabase) return null;

    const authCode = new AuthorizationCode(
      authCodeFromDatabase.resourceOwnerId,
      authCodeFromDatabase.clientId,
      authCodeFromDatabase.code,
      authCodeFromDatabase.permissions
    );

    return authCode;
  }
}
