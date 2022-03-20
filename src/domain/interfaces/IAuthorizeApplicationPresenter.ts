export interface IAuthorizeApplicationPresenter {
  present: (code: string, redirectUri: string) => any;
}
