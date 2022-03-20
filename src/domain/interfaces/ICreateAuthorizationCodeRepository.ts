import { AuthorizationCode } from "../entities/AuthorizationCode";

export interface ICreateAuthorizationCodeRepository {
  create: (
    authorizationCodeEntity: AuthorizationCode
  ) => Promise<AuthorizationCode>;
}
