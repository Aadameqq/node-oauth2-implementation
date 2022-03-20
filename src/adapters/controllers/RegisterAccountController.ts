import { createAccount } from "../../application/use-cases/createAccount";
import { ICreateAccountRepository } from "../../domain/interfaces/ICreateAccountRepository";
import { IHashPasswordHasher } from "../../domain/interfaces/IHashPasswordHasher";
import { IGenerator } from "../../domain/interfaces/IGenerator";
import { IRegisterAccountPresenter } from "../../domain/interfaces/IRegisterAccountPresenter";

interface IRegisterAccountControllerRequest {
  body: {
    nickname: string;
    mail: string;
    password: string;
  };
}

export class RegisterAccountController {
  handle = async (
    accountRepository: ICreateAccountRepository,
    passwordHasher: IHashPasswordHasher,
    idGenerator: IGenerator,
    presenter: IRegisterAccountPresenter,
    request: IRegisterAccountControllerRequest
  ) => {
    const account = await createAccount(
      accountRepository,
      passwordHasher,
      idGenerator,
      request.body
    );

    return presenter.present(account.nickname);
  };
}
