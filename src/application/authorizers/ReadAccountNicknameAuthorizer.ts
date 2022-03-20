import { IHasAccessAuthorizer } from "../../domain/interfaces/IHasAccessAuthorizer";

export class ReadAccountNicknameAuthorizer implements IHasAccessAuthorizer {
  private permissionName = "read_acc_nickname";

  hasAccess(permissions: string[]): boolean {
    return !!permissions.includes(this.permissionName);
  }
}
