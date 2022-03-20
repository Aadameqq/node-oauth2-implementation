import { Account } from "../../domain/entities/Account";
import { App } from "../../domain/entities/App";
import { AuthorizationCode } from "../../domain/entities/AuthorizationCode";
import { IGenerator } from "../../domain/interfaces/IGenerator";
import { ICreateAuthorizationCodeRepository } from "../../domain/interfaces/ICreateAuthorizationCodeRepository";

export interface CreateAuthorizationCodeProps {
  redirectUri: string;
  application: App;
  resourceOwnerId: string;
}

export const createAuthorizationCode = async (
  authorizationCodeRepository: ICreateAuthorizationCodeRepository,
  codeGenerator: IGenerator,
  { redirectUri, application, resourceOwnerId }: CreateAuthorizationCodeProps
) => {
  if (redirectUri !== application.redirectUri) return { error: true };

  const code = codeGenerator.generate();

  const authorizationCode = new AuthorizationCode(
    resourceOwnerId,
    application.id,
    code,
    application.permissions
  );

  await authorizationCodeRepository.create(authorizationCode);

  return { code };
};
