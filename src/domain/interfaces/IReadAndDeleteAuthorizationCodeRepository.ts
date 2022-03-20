import { AuthorizationCode } from "../entities/AuthorizationCode";

export interface IReadAndDeleteAuthorizationCodeRepository {
  readAndDelete: (code: string) => Promise<AuthorizationCode | null>;
}
