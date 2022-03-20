import { authorizeAccess } from "../../application/use-cases/authorizeAccess";
import { IHasAccessAuthorizer } from "../../domain/interfaces/IHasAccessAuthorizer";
import { IVerifyAndGetDataTokenManager } from "../../domain/interfaces/IVerifyAndGetDataTokenManager";
import { IAuthorizeApplicationPresenter } from "../../domain/interfaces/IAuthorizeApplicationPresenter";
import { UnauthorizedError } from "../../application/error/UnauthorizedError";
import { createAuthorizationCode } from "../../application/use-cases/createAuthorizationCode";
import { readApplication } from "../../application/use-cases/readApplication";
import { IReadApplicationRepository } from "../../domain/interfaces/IReadApplicationRepository";
import { ICreateAuthorizationCodeRepository } from "../../domain/interfaces/ICreateAuthorizationCodeRepository";
import { IGenerator } from "../../domain/interfaces/IGenerator";
import { BadRequestError } from "../../application/error/BadRequestError";
import { App } from "../../domain/entities/App";

export interface IAuthorizeApplicationControllerRequest {
  body: {
    token: string;
  };
  query: {
    client_id: string;
    redirect_uri: string;
  };
}

export class AuthorizeApplicationController {
  handle = async (
    authorizer: IHasAccessAuthorizer,
    tokenManager: IVerifyAndGetDataTokenManager,
    appRepository: IReadApplicationRepository,
    authCodeRepository: ICreateAuthorizationCodeRepository,
    codeGenerator: IGenerator,
    presenter: IAuthorizeApplicationPresenter,
    request: IAuthorizeApplicationControllerRequest
  ) => {
    const authorizationResponse = await authorizeAccess(
      authorizer,
      tokenManager,
      request.body.token
    );

    const appResponse = await readApplication(appRepository, {
      id: request.query.client_id,
    });

    if (appResponse.error) throw new BadRequestError();

    if (!authorizationResponse.granted) throw new UnauthorizedError();

    const authCodeResponse = await createAuthorizationCode(
      authCodeRepository,
      codeGenerator,
      {
        redirectUri: request.query.redirect_uri,
        application: appResponse.application as App,
        resourceOwnerId: authorizationResponse!.payload!.resourceOwnerId,
      }
    );

    if (authCodeResponse.error) throw new UnauthorizedError();
    return presenter.present(
      appResponse!.application!.redirectUri,
      authCodeResponse!.code!
    );
  };
}
