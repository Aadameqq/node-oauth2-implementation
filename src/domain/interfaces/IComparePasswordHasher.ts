export interface IComparePasswordHasher {
  compare: (
    password: string,
    hashedPassword: string
  ) => Promise<{ areEqual: boolean }>;
}
