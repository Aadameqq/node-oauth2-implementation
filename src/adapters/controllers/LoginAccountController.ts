import { loginAccount } from "../../application/use-cases/loginAccount";
import { BadRequestError } from "../../application/error/BadRequestError";
import { createAuthorizationToken } from "../../application/use-cases/createAuthorizationToken";
import { ISignTokenManager } from "../../domain/interfaces/ISignTokenManager";
import { IComparePasswordHasher } from "../../domain/interfaces/IComparePasswordHasher";
import { IReadAccountRepository } from "../../domain/interfaces/IReadAccountRepository";
import { ILoginAccountPresenter } from "../../domain/interfaces/ILoginAccountPresenter";

export interface ILoginAccountControllerRequest {
  body: {
    nickname: string;
    password: string;
  };
}
export class LoginAccountController {
  handle = async (
    presenter: ILoginAccountPresenter,
    repository: IReadAccountRepository,
    accessTokenManager: ISignTokenManager,
    refreshTokenManager: ISignTokenManager,
    passwordHasher: IComparePasswordHasher,
    request: ILoginAccountControllerRequest
  ) => {
    const { nickname, password } = request.body;

    const loginData = await loginAccount(repository, passwordHasher, {
      nickname,
      password,
    });

    if (loginData.error) throw new BadRequestError();

    const tokens = await createAuthorizationToken(
      accessTokenManager,
      refreshTokenManager,
      {
        resourceOwnerId: loginData!.payload!.id,
        clientId: loginData!.payload!.id,
        permissions: [],
      }
    );

    return presenter.present(tokens.accessToken, tokens.refreshToken);
  };
}
