import { updateApplication } from "../../application/use-cases/updateApplication";
import { IUpdateApplicationRepository } from "../../domain/interfaces/IUpdateApplicationRepository";
import { IUpdateApplicationPresenter } from "../../domain/interfaces/IUpdateApplicationPresenter";
import { BadRequestError } from "../../application/error/BadRequestError";
import { authorizeAccess } from "../../application/use-cases/authorizeAccess";
import { AlwaysNoAccessAuthorizer } from "../../application/authorizers/AlwaysNoAccessAuthorizer";
import { UnauthorizedError } from "../../application/error/UnauthorizedError";
import { readApplication } from "../../application/use-cases/readApplication";
import { AccessTokenManager } from "../../infrastructure/utils/AccessTokenManager";
import { IReadApplicationRepository } from "../../domain/interfaces/IReadApplicationRepository";

export interface IUpdateApplicationControllerRequest {
  params: {
    id: string;
  };
  body: {
    name: string;
    redirectUri: string;
    permissions: string[];
    token: string;
  };
}

export class UpdateApplicationController {
  handle = async (
    appRepository: IUpdateApplicationRepository & IReadApplicationRepository,
    tokenManager: AccessTokenManager,
    request: IUpdateApplicationControllerRequest,
    presenter: IUpdateApplicationPresenter
  ) => {
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

    const useCaseParameters = {
      ...request.params,
      ...request.body,
    };

    const updateAppResponse = await updateApplication(
      appRepository,
      useCaseParameters
    );

    if (updateAppResponse.error) throw new BadRequestError();

    return presenter.present();
  };
}
