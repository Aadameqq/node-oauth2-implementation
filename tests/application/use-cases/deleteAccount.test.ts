import { Account } from "../../../src/domain/entities/Account";
import { deleteAccount } from "../../../src/application/use-cases/deleteAccount";

describe("delete Account use case", () => {
  const testAccount = new Account("id", "nickname", "password", "mail");

  const accountRepositoryMock = {
    delete: jest
      .fn()
      .mockImplementation((id) => id === testAccount.id && testAccount),
  };

  const runDeleteAccount = (args: any) => {
    return deleteAccount(accountRepositoryMock, args);
  };

  test("Should call repository method with all required parameters", async () => {
    await runDeleteAccount({ id: testAccount.id });

    expect(accountRepositoryMock.delete).toBeCalledWith(testAccount.id);
  });
  test("Should return error When user doesn't exist", async () => {
    const response = await runDeleteAccount({ id: "invalid id" });

    expect(response).toEqual({ error: true });
  });
  test("Should return success When user exists", async () => {
    const response = await runDeleteAccount({ id: testAccount.id });

    expect(response).toEqual({ success: true });
  });
});
