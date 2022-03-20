import { Account } from "../../../src/domain/entities/Account";
import {
  changeAccountNickname,
  CreateAccountProps,
} from "../../../src/application/use-cases/changeAccountNickname";

describe("changeAccountNickname use case", () => {
  const testAccount = new Account("id", "nick", "password", "mail");

  const accountRepositoryMock = {
    updateNickname: jest
      .fn()
      .mockImplementation((id) => id === testAccount.id && testAccount),
  };

  const runChangeAccountNickname = (args: CreateAccountProps) => {
    return changeAccountNickname(accountRepositoryMock, args);
  };

  test("Should call account repository update nickname method with required parameters", async () => {
    const testedNickname = "newnickname";

    await runChangeAccountNickname({
      nickname: testedNickname,
      id: testAccount.id,
    });

    expect(accountRepositoryMock.updateNickname).toBeCalledWith(
      testAccount.id,
      testedNickname
    );
  });
  test("Should return error When user with given id doesn't exist in repository", async () => {
    const testedNickname = "newnickname";

    const output = await runChangeAccountNickname({
      nickname: testedNickname,
      id: "otherid",
    });

    expect(output).toEqual({ error: true });
  });
  test("Should return updated account object When user exists in repository", async () => {
    const testedNickname = "newnickname";

    const output = await runChangeAccountNickname({
      nickname: testedNickname,
      id: testAccount.id,
    });

    expect(output).toEqual({ updatedAccount: testAccount });
  });
});
