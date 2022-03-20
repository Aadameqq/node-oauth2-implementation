export interface IHasAccessAuthorizer {
  hasAccess: (permissions: string[]) => boolean;
}
