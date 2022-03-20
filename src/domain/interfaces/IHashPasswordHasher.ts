export interface IHashPasswordHasher {
  hash: (password: string) => Promise<string>;
}
