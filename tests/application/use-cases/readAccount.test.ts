import { Account } from "../../../src/domain/entities/Account";
import { readAccount } from "../../../src/application/use-cases/readAccount";
import { IReadAccountRepository } from "../../../src/domain/interfaces/IReadAccountRepository";

describe("readAccount use case", () => {
  const testAccount = new Account("id", "nick", "pass", "mail");

  const appRepositoryMock = {
    readById: jest
      .fn()
      .mockImplementation((id: string) => id === testAccount.id && testAccount),
  };

  const runReadAccount = async (args?: any) => {
    return readAccount(appRepositoryMock, args || testAccount);
  };

  test("Should call app repository method with required parameters", async () => {
    await runReadAccount();

    expect(appRepositoryMock.readById).toBeCalledWith(testAccount.id);
  });
  test("Should return error When account doesn't exist", async () => {
    const response = await runReadAccount({ id: "invalid" });

    expect(response).toEqual({ error: true });
  });
  test("Should return account object When account exists", async () => {
    const response = await runReadAccount();

    expect(response).toEqual({ account: testAccount });
  });
});
