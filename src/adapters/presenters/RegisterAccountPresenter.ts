import { IRegisterAccountPresenter } from "../../domain/interfaces/IRegisterAccountPresenter";

export class RegisterAccountPresenter implements IRegisterAccountPresenter {
  present = (nickname: string) => {
    return {
      statusCode: 201,
      message: `Account ${nickname} created`,
    };
  };
}
