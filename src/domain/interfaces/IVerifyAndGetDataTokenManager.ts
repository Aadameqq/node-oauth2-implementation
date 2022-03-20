import { Authorization } from "../entities/Authorization";

export interface IVerifyAndGetDataTokenManager {
  getData: (token: string) => Promise<Authorization | null>;
  verify: (token: string) => Promise<{ isValid: boolean }>;
}
