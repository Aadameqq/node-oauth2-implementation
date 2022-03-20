class App {
  // eslint-disable-next-line no-useless-constructor
  constructor(
    readonly id: string,
    readonly name: string,
    readonly ownerId: string,
    readonly permissions: string[],
    readonly redirectUri: string,
    readonly secret: string
  ) {}
}

export { App };
