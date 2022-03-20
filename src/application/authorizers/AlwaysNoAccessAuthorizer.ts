import { IHasAccessAuthorizer } from "../../domain/interfaces/IHasAccessAuthorizer";

export class AlwaysNoAccessAuthorizer implements IHasAccessAuthorizer {
  hasAccess(permissions: string[]): boolean {
    return false;
  }
}
