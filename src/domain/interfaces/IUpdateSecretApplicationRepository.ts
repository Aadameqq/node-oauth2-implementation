import { App } from "../entities/App";

export interface IUpdateSecretApplicationRepository {
  updateSecret: (id: string, secret: string) => Promise<App | null>;
}
