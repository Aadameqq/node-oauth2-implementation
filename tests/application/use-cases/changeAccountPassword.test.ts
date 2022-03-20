import { Account } from "../../../src/domain/entities/Account";
import { deleteAccount } from "../../../src/application/use-cases/deleteAccount";
import { changeAccountPassword } from "../../../src/application/use-cases/changeAccountPassword";

describe("", () => {
  const testHash = "hash";
  const testAccount = new Account("id", "nickname", testHash, "mail");

  const accountRepositoryMock = {
    updatePassword: jest
      .fn()
      .mockImplementation((id) => id === testAccount.id && testAccount),
  };

  const passwordHasherMock = {
    hash: jest.fn().mockImplementation((password) => testHash),
  };

  const runChangeAccountPassword = (args: any) => {
    return changeAccountPassword(
      accountRepositoryMock,
      passwordHasherMock,
      args
    );
  };
  test("Should call repository method with required parameters", async () => {
    await runChangeAccountPassword({
      id: testAccount.id,
      password: "hello",
    });

    expect(accountRepositoryMock.updatePassword).toBeCalledWith(
      testAccount.id,
      testHash
    );
  });
  test("Should call password hasher method with required parameters", async () => {
    const expectedPassword = "hello";
    await runChangeAccountPassword({
      id: testAccount.id,
      password: expectedPassword,
    });

    expect(passwordHasherMock.hash).toBeCalledWith(expectedPassword);
  });
  test("Should return error When user doesn't exist", async () => {
    const response = await runChangeAccountPassword({
      id: "im invalid",
      password: "pass",
    });

    expect(response).toEqual({ error: true });
  });
  test("Should return success When password changed successfully", async () => {
    const response = await runChangeAccountPassword({
      id: testAccount.id,
      password: "pass",
    });

    expect(response).toEqual({ success: true });
  });
});
