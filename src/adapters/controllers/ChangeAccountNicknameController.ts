import { authorizeAccess } from "../../application/use-cases/authorizeAccess";
import { IVerifyAndGetDataTokenManager } from "../../domain/interfaces/IVerifyAndGetDataTokenManager";
import { UnauthorizedError } from "../../application/error/UnauthorizedError";
import { readAccount } from "../../application/use-cases/readAccount";
import { NotFoundError } from "../../application/error/NotFoundError";
import { ChangeAccountNicknameAuthorizer } from "../../application/authorizers/ChangeAccountNicknameAuthorizer";
import { IChangeAccountNicknamePresenter } from "../../domain/interfaces/IChangeAccountNicknamePresenter";
import { changeAccountNickname } from "../../application/use-cases/changeAccountNickname";
import { BadRequestError } from "../../application/error/BadRequestError";
import { IUpdateNicknameAccountRepository } from "../../domain/interfaces/IUpdateNicknameAccountRepository";

export interface IChangeAccountNicknameControllerRequest {
  body: {
    token: string;
    nickname: string;
  };
}

export class ChangeAccountNicknameController {
  async handle(
    tokenManager: IVerifyAndGetDataTokenManager,
    accountRepository: IUpdateNicknameAccountRepository,
    request: IChangeAccountNicknameControllerRequest,
    presenter: IChangeAccountNicknamePresenter
  ) {
    const authAccessResponse = await authorizeAccess(
      new ChangeAccountNicknameAuthorizer(),
      tokenManager,
      request.body.token
    );

    if (!authAccessResponse.granted) throw new UnauthorizedError();

    const changeNicknameResponse = await changeAccountNickname(
      accountRepository,
      { ...request.body, id: authAccessResponse!.payload!.resourceOwnerId! }
    );

    if (changeNicknameResponse.error) throw new BadRequestError();

    return presenter.present(changeNicknameResponse!.updatedAccount!.nickname!);
  }
}
