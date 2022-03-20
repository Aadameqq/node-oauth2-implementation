class Authorization {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    readonly resourceOwnerId: string,
    readonly clientId: string,
    readonly token: string,
    readonly permissions: string[],
    readonly isAccount: boolean
  ) {}
}

export { Authorization };
