export interface ISignTokenManager {
  sign: (
    resourceOwnerId: string,
    clientId: string,
    permissions: string[],
    isAccount: boolean
  ) => Promise<string>;
}
