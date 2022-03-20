import { IAuthorizeApplicationPresenter } from "../../domain/interfaces/IAuthorizeApplicationPresenter";

export class AuthorizeApplicationPresenter
  implements IAuthorizeApplicationPresenter
{
  present = (redirectUri: string, code: string) => ({
    statusCode: 200,
    redirect: {
      uri: `${redirectUri}/?code=${code}`,
    },
  });
}
