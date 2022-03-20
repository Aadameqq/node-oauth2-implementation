import { IUpdateApplicationPresenter } from "../../domain/interfaces/IUpdateApplicationPresenter";

export class UpdateApplicationPresenter implements IUpdateApplicationPresenter {
  present(): any {
    return {
      statusCode: 200,
    };
  }
}
