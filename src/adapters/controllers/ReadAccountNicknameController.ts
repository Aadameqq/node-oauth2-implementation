import { authorizeAccess } from "../../application/use-cases/authorizeAccess";
import { ReadAccountNicknameAuthorizer } from "../../application/authorizers/ReadAccountNicknameAuthorizer";
import { IVerifyAndGetDataTokenManager } from "../../domain/interfaces/IVerifyAndGetDataTokenManager";
import { UnauthorizedError } from "../../application/error/UnauthorizedError";
import { readAccount } from "../../application/use-cases/readAccount";
import { IReadAccountByIdRepository } from "../../domain/interfaces/IReadAccountByIdRepository";
import { IReadAccountNicknamePresenter } from "../../domain/interfaces/IReadAccountNicknamePresenter";
import { NotFoundError } from "../../application/error/NotFoundError";

export interface IReadAccountNicknameControllerRequest {
  body: {
    token: string;
  };
}

export class ReadAccountNicknameController {
  async handle(
    tokenManager: IVerifyAndGetDataTokenManager,
    accountRepository: IReadAccountByIdRepository,
    request: IReadAccountNicknameControllerRequest,
    presenter: IReadAccountNicknamePresenter
  ) {
    const authAccessResponse = await authorizeAccess(
      new ReadAccountNicknameAuthorizer(),
      tokenManager,
      request.body.token
    );

    if (!authAccessResponse.granted) throw new UnauthorizedError();

    const readAccountResponse = await readAccount(accountRepository, {
      id: authAccessResponse!.payload!.resourceOwnerId!,
    });

    if (readAccountResponse.error) throw new NotFoundError();

    return presenter.present(readAccountResponse!.account!.nickname!);
  }
}
