import { ICreateApplicationPresenter } from "../../domain/interfaces/ICreateApplicationPresenter";
import { App } from "../../domain/entities/App";

export class CreateApplicationPresenter implements ICreateApplicationPresenter {
  present(app: App): any {
    return {
      statusCode: 201,
      body: {
        id: app.id,
        ownerId: app.ownerId,
        name: app.name,
      },
    };
  }
}
