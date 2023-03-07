import { ICreateApplicationRepository } from "../../../domain/interfaces/ICreateApplicationRepository";
import AppModel from "../models/AppModel";
import { App } from "../../../domain/entities/App";
import { IReadApplicationRepository } from "../../../domain/interfaces/IReadApplicationRepository";
import { IUpdateApplicationRepository } from "../../../domain/interfaces/IUpdateApplicationRepository";
import { IUpdateSecretApplicationRepository } from "../../../domain/interfaces/IUpdateSecretApplicationRepository";

export class ApplicationRepositoryMongodb
  implements
    ICreateApplicationRepository,
    IReadApplicationRepository,
    IUpdateApplicationRepository,
    IUpdateSecretApplicationRepository
{
  async create(app: App): Promise<App> {
    const appFromDatabase = (await new AppModel(app).save()) as any;

    const newApp = new App(
      appFromDatabase.id,
      appFromDatabase.name,
      appFromDatabase.ownerId,
      appFromDatabase.permissions,
      appFromDatabase.redirectUri,
      appFromDatabase.secret
    );
    return newApp;
  }

  async read(id: string): Promise<App | null> {
    const appFromDatabase = await AppModel.findOne({ id });

    if (!appFromDatabase) return null;

    const application = new App(
      appFromDatabase.id,
      appFromDatabase.name,
      appFromDatabase.ownerId,
      appFromDatabase.permissions,
      appFromDatabase.redirectUri,
      appFromDatabase.secret
    );

    return application;
  }

  async update(
    id: string,
    name: string,
    redirectUri: string,
    permissions: string[]
  ) {
    const appFromDatabase = await AppModel.findOneAndUpdate(
      { id },
      { name, redirectUri, permissions }
    );

    if (!appFromDatabase) return null;

    const app = new App(
      appFromDatabase.id,
      appFromDatabase.name,
      appFromDatabase.ownerId,
      appFromDatabase.permissions,
      appFromDatabase.redirectUri,
      appFromDatabase.secret
    );

    return app;
  }

  async updateSecret(id: string, secret: string): Promise<App | null> {
    const appFromDatabase = await AppModel.findOneAndUpdate({ id }, { secret });

    if (!appFromDatabase) return null;

    const app = new App(
      appFromDatabase.id,
      appFromDatabase.name,
      appFromDatabase.ownerId,
      appFromDatabase.permissions,
      appFromDatabase.redirectUri,
      appFromDatabase.secret
    );

    return app;
  }
}
