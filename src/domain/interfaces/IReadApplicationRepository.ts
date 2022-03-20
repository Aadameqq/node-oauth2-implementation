import { App } from "../entities/App";

export interface IReadApplicationRepository {
  read: (id: string) => Promise<App | null>;
}
