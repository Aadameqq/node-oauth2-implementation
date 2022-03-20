import { Account } from "../../../src/domain/entities/Account";
import { changeAccountMail } from "../../../src/application/use-cases/changeAccountMail";

describe("changeAccountMail use case", () => {
  const testAccount = new Account("id", "nick", "password", "mail");

  const accountRepositoryMock = {
    updateMail: jest
      .fn()
      .mockImplementation((id) => id === testAccount.id && testAccount),
  };

  const expectedMail = "newmail";

  const runChangeAccountMail = (args: any) => {
    return changeAccountMail(accountRepositoryMock, args);
  };

  test("Should call account repository method with all required props", async () => {
    await runChangeAccountMail({ id: testAccount.id, mail: expectedMail });

    expect(accountRepositoryMock.updateMail).toBeCalledWith(
      testAccount.id,
      expectedMail
    );
  });
  test("Should return error When user doesn't exist", async () => {
    const response = await runChangeAccountMail({
      id: "invalidid",
      mail: expectedMail,
    });

    expect(response).toEqual({ error: true });
  });
  test("Should return success When user exists", async () => {
    const response = await runChangeAccountMail({
      id: testAccount.id,
      mail: expectedMail,
    });

    expect(response).toEqual({ success: true });
  });
});
