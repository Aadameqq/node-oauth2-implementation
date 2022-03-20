import { App } from "../entities/App";

export interface ICreateApplicationPresenter {
  present: (app: App) => any;
}
