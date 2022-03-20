import { IExchangeCodeForTokenPresenter } from "../../domain/interfaces/IExchangeCodeForTokenPresenter";

export class ExchangeCodeForTokenPresenter
  implements IExchangeCodeForTokenPresenter
{
  present(accessToken: string, refreshToken: string): any {
    return {
      statusCode: 200,
      body: {
        accessToken,
        refreshToken,
      },
    };
  }
}
