import { IChangeApplicationSecretPresenter } from "../../domain/interfaces/IChangeApplicationSecretPresenter";

export class ChangeApplicationSecretPresenter
  implements IChangeApplicationSecretPresenter
{
  present = () => {
    return { statusCode: 200 };
  };
}
