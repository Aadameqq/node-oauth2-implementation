import { createApplication } from "../../application/use-cases/createApplication";
import { ICreateApplicationRepository } from "../../domain/interfaces/ICreateApplicationRepository";
import { IGenerator } from "../../domain/interfaces/IGenerator";
import { ICreateApplicationPresenter } from "../../domain/interfaces/ICreateApplicationPresenter";
import { authorizeAccess } from "../../application/use-cases/authorizeAccess";
import { UnauthorizedError } from "../../application/error/UnauthorizedError";
import { IVerifyAndGetDataTokenManager } from "../../domain/interfaces/IVerifyAndGetDataTokenManager";
import { IHasAccessAuthorizer } from "../../domain/interfaces/IHasAccessAuthorizer";

export interface ICreateApplicationControllerRequest {
  body: {
    name: string;
    token: string;
  };
}

export class CreateApplicationController {
  handle = async (
    appRepository: ICreateApplicationRepository,
    idGenerator: IGenerator,
    secretGenerator: IGenerator,
    tokenManager: IVerifyAndGetDataTokenManager,
    authorizer: IHasAccessAuthorizer,
    presenter: ICreateApplicationPresenter,
    request: ICreateApplicationControllerRequest
  ) => {
    const authorization = await authorizeAccess(
      authorizer,
      tokenManager,
      request.body.token
    );

    if (!authorization.granted) throw new UnauthorizedError();

    const data = {
      ownerId: authorization!.payload!.resourceOwnerId,
      name: request.body.name,
    };

    const app = await createApplication(
      appRepository,
      idGenerator,
      secretGenerator,
      data
    );

    return presenter.present(app.application);
  };
}
