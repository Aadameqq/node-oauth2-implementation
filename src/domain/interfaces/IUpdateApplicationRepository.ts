import { App } from "../entities/App";

export interface IUpdateApplicationRepository {
  update: (
    id: string,
    name: string,
    redirectUri: string,
    permissions: string[]
  ) => Promise<App | null>;
}
