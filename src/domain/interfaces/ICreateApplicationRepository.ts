import { App } from "../entities/App";

export interface ICreateApplicationRepository {
  create: (app: App) => Promise<App>;
}
