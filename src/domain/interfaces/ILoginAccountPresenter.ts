export interface ILoginAccountPresenter {
  present: (accessToken: string, refreshToken: string) => any;
}
