import { ILoginAccountPresenter } from "../../domain/interfaces/ILoginAccountPresenter";

export class LoginAccountPresenter implements ILoginAccountPresenter {
  present = (accessToken: string, refreshToken: string) => {
    return {
      statusCode: 200,
      body: {
        accessToken,
        refreshToken,
      },
    };
  };
}
