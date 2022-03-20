import { Account } from "../../domain/entities/Account";
import { AuthorizationCode } from "../../domain/entities/AuthorizationCode";
import { IReadAndDeleteAuthorizationCodeRepository } from "../../domain/interfaces/IReadAndDeleteAuthorizationCodeRepository";
import { App } from "../../domain/entities/App";

export interface GetAuthorizationDataFromCodeProps {
  code: string;
  application: App;
  appSecret: string;
  appRedirectUri: string;
}

export const getAuthorizationDataFromCode = async (
  authorizationCodeRepository: IReadAndDeleteAuthorizationCodeRepository,
  {
    code,
    application,
    appSecret,
    appRedirectUri,
  }: GetAuthorizationDataFromCodeProps
) => {
  const authorizationCode = await authorizationCodeRepository.readAndDelete(
    code
  );

  if (
    application.secret !== appSecret ||
    application.redirectUri !== appRedirectUri
  )
    return { error: true };

  if (!authorizationCode) return { error: true };

  return { authorizationCode };
};
