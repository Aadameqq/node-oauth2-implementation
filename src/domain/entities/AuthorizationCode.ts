class AuthorizationCode {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    readonly resourceOwnerId: string,
    readonly clientId: string,
    readonly code: string,
    readonly permissions: string[]
  ) {}
}

export { AuthorizationCode };
