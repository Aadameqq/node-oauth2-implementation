import { changeApplicationSecret } from "../../application/use-cases/changeApplicationSecret";
import { IUpdateSecretApplicationRepository } from "../../domain/interfaces/IUpdateSecretApplicationRepository";
import { IGenerator } from "../../domain/interfaces/IGenerator";
import { BadRequestError } from "../../application/error/BadRequestError";
import { IChangeApplicationSecretPresenter } from "../../domain/interfaces/IChangeApplicationSecretPresenter";
import { authorizeAccess } from "../../application/use-cases/authorizeAccess";
import { AlwaysNoAccessAuthorizer } from "../../application/authorizers/AlwaysNoAccessAuthorizer";
import { IVerifyAndGetDataTokenManager } from "../../domain/interfaces/IVerifyAndGetDataTokenManager";
import { UnauthorizedError } from "../../application/error/UnauthorizedError";
import { IReadApplicationRepository } from "../../domain/interfaces/IReadApplicationRepository";
import { readApplication } from "../../application/use-cases/readApplication";

export interface IChangeApplicationSecretControllerRequest {
  params: {
    id: string;
  };
  body: {
    token: string;
  };
}

export class ChangeApplicationSecretController {
  async handle(
    appRepository: IUpdateSecretApplicationRepository &
      IReadApplicationRepository,
    secretGenerator: IGenerator,
    request: IChangeApplicationSecretControllerRequest,
    presenter: IChangeApplicationSecretPresenter,
    tokenManager: IVerifyAndGetDataTokenManager
  ) {
    const authorizeAccessResponse = await authorizeAccess(
      new AlwaysNoAccessAuthorizer(),
      tokenManager,
      request.body.token
    );

    if (!authorizeAccessResponse.granted) throw new UnauthorizedError();

    const readAppResponse = await readApplication(
      appRepository,
      request.params
    );

    if (readAppResponse.error) throw new BadRequestError();

    if (
      authorizeAccessResponse!.payload!.resourceOwnerId! !==
      readAppResponse!.application!.ownerId
    )
      throw new UnauthorizedError();

    const changeSecretResponse = await changeApplicationSecret(
      appRepository,
      secretGenerator,
      request.params
    );

    if (changeSecretResponse.error) throw new BadRequestError();

    return presenter.present();
  }
}
