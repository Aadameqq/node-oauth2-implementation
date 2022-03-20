import { createAccount } from "../../../src/application/use-cases/createAccount";
import { Account } from "../../../src/domain/entities/Account";

describe("createAccount Use Case", () => {
  const testId = "Imid";

  const passwordHasherMock = {
    hash: jest.fn().mockImplementation((password) => password),
  };
  const accountRepositoryMock = {
    create: jest.fn().mockImplementation((account) => account),
  };
  const generatorMock = { generate: jest.fn().mockReturnValue(testId) };

  test("Should return account object When passed all required props", async () => {
    const testAccount = {
      nickname: "Nickname",
      password: "Password",
      mail: "Mail",
    };

    const createdAccount = await createAccount(
      accountRepositoryMock,
      passwordHasherMock,
      generatorMock,
      testAccount
    );

    const expectedAccount = new Account(
      testId,
      testAccount.nickname,
      testAccount.password,
      testAccount.mail
    );

    expect(createdAccount).toEqual(expectedAccount);
  });
  test("Should call repository method with valid args When passed all required props", async () => {
    const testAccount = {
      nickname: "Nickname",
      password: "Password",
      mail: "Mail",
    };

    await createAccount(
      accountRepositoryMock,
      passwordHasherMock,
      generatorMock,
      testAccount
    );

    expect(accountRepositoryMock.create).toBeCalledWith(
      expect.objectContaining(testAccount)
    );
  });
  test("Should call password hash method with valid args When passed all required props", async () => {
    const testAccount = {
      nickname: "Nickname",
      password: "Password",
      mail: "Mail",
    };

    await createAccount(
      accountRepositoryMock,
      passwordHasherMock,
      generatorMock,
      testAccount
    );

    expect(passwordHasherMock.hash).toBeCalledWith(testAccount.password);
  });
  test("Should generate id for account When passed all required props", async () => {
    const testAccount = {
      nickname: "Nickname",
      password: "Password",
      mail: "Mail",
    };

    const createdAccount = await createAccount(
      accountRepositoryMock,
      passwordHasherMock,
      generatorMock,
      testAccount
    );

    expect(createdAccount).toEqual(expect.objectContaining({ id: testId }));
  });
  test("Should return hashed password When passed all required props", async () => {
    const testAccount = {
      nickname: "Nickname",
      password: "Password",
      mail: "Mail",
    };

    const expectedHashedPassword = "hashed password";

    const localPasswordHasherMock = {
      hash: jest.fn().mockReturnValue(expectedHashedPassword),
    };

    const createdAccount = await createAccount(
      accountRepositoryMock,
      localPasswordHasherMock,
      generatorMock,
      testAccount
    );

    expect(createdAccount).toEqual(
      expect.objectContaining({ password: expectedHashedPassword })
    );
  });
  test("Should return instance of Account When passed all required props", async () => {
    const testAccount = {
      nickname: "Nickname",
      password: "Password",
      mail: "Mail",
    };

    const createdAccount = await createAccount(
      accountRepositoryMock,
      passwordHasherMock,
      generatorMock,
      testAccount
    );
    expect(createdAccount).toBeInstanceOf(Account);
  });
});
