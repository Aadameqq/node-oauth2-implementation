export interface IExchangeCodeForTokenPresenter {
  present: (accessToken: string, refreshToken: string) => any;
}
