import { readApplication } from "../../application/use-cases/readApplication";
import { IReadApplicationRepository } from "../../domain/interfaces/IReadApplicationRepository";
import { getAuthorizationDataFromCode } from "../../application/use-cases/getAuthorizationDataFromCode";
import { IReadAndDeleteAuthorizationCodeRepository } from "../../domain/interfaces/IReadAndDeleteAuthorizationCodeRepository";
import { IExchangeCodeForTokenPresenter } from "../../domain/interfaces/IExchangeCodeForTokenPresenter";
import { createAuthorizationToken } from "../../application/use-cases/createAuthorizationToken";
import { ISignTokenManager } from "../../domain/interfaces/ISignTokenManager";
import { NotFoundError } from "../../application/error/NotFoundError";
import { BadRequestError } from "../../application/error/BadRequestError";

export interface IExchangeCodeForTokenControllerRequest {
  query: {
    client_id: string;
    client_secret: string;
    redirect_uri: string;
    code: string;
  };
}

export class ExchangeCodeForTokenController {
  async handle(
    appRepository: IReadApplicationRepository,
    authorizationCodeRepository: IReadAndDeleteAuthorizationCodeRepository,
    accessTokenManager: ISignTokenManager,
    refreshTokenManager: ISignTokenManager,
    request: IExchangeCodeForTokenControllerRequest,
    presenter: IExchangeCodeForTokenPresenter
  ) {
    const appResponse = await readApplication(appRepository, {
      id: request.query.client_id,
    });

    if (appResponse.error) throw new NotFoundError();

    const getAuthorizationDataResponse = await getAuthorizationDataFromCode(
      authorizationCodeRepository,
      {
        code: request.query.code,
        application: appResponse!.application!,
        appSecret: request.query.client_secret,
        appRedirectUri: request.query.redirect_uri,
      }
    );

    if (getAuthorizationDataResponse.error) throw new BadRequestError();

    const authorizationCode = getAuthorizationDataResponse!.authorizationCode!;

    const createAuthTokenResponse = await createAuthorizationToken(
      accessTokenManager,
      refreshTokenManager,
      { ...authorizationCode }
    );

    return presenter.present(
      createAuthTokenResponse.accessToken,
      createAuthTokenResponse.refreshToken
    );
  }
}
