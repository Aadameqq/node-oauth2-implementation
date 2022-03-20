class Account {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    readonly id: string,
    readonly nickname: string,
    readonly password: string,
    readonly mail: string
  ) {}
}

export { Account };
