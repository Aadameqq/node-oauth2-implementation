import { IHasAccessAuthorizer } from "../../domain/interfaces/IHasAccessAuthorizer";

export class ChangeAccountNicknameAuthorizer implements IHasAccessAuthorizer {
  private permissionName = "change_acc_nickname";

  hasAccess(permissions: string[]): boolean {
    return !!permissions.includes(this.permissionName);
  }
}
