import { loginAccount } from "../../../src/application/use-cases/loginAccount";
import { Account } from "../../../src/domain/entities/Account";

describe("loginAccount Use Case", () => {
  const testToken = "token";

  const testAccount = {
    id: "hello",
    nickname: "Nickname",
    password: "Password",
    mail: "mail",
  };

  const passwordHasherMock = {
    compare: jest.fn().mockImplementation((password, hashPassword) => ({
      areEqual: password === hashPassword,
    })),
  };
  const accountRepositoryMock = {
    read: jest.fn().mockImplementation((nickname) => testAccount),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should return account object When account exists and passwords are the same", async () => {
    const output = await loginAccount(
      accountRepositoryMock,
      passwordHasherMock,
      testAccount
    );

    const expectedAccount = new Account(
      testAccount.id,
      testAccount.nickname,
      testAccount.password,
      testAccount.mail
    );

    expect(output).toEqual({ error: false, payload: expectedAccount });
  });

  test("Should call passwordHasher method with required params When passed all required props", async () => {
    await loginAccount(accountRepositoryMock, passwordHasherMock, testAccount);

    expect(passwordHasherMock.compare).toBeCalledWith(
      testAccount.password,
      testAccount.password
    );
  });
  test("Should call repository method with required params When passed all required props", async () => {
    await loginAccount(accountRepositoryMock, passwordHasherMock, testAccount);

    expect(accountRepositoryMock.read).toBeCalledWith(testAccount.nickname);
  });
  test("Should return error When account wasn't found in repository", async () => {
    accountRepositoryMock.read.mockImplementationOnce(() => null);

    const output = await loginAccount(
      accountRepositoryMock,
      passwordHasherMock,
      testAccount
    );

    expect(output).toEqual({ error: true });
  });
  test("Should return error When account was found but passwords weren't the same", async () => {
    const output = await loginAccount(
      accountRepositoryMock,
      passwordHasherMock,
      { ...testAccount, password: "invalid password" }
    );

    expect(output).toEqual({ error: true });
  });
});
