import { App } from "../../../src/domain/entities/App";
import { validateDataWithApp } from "../../../src/application/use-cases/validateDataWithApp";

describe("validateDataWithApp", () => {
  const testApp = new App(
    "id",
    "name",
    "owId",
    ["perm1", "perm2"],
    "redUri",
    "secret"
  );

  const runValidateDataWithApp = (args: Partial<App>) => {
    return validateDataWithApp(testApp, args);
  };

  test("Should return error When passed object is not contained in app", async () => {
    const testedObject = {
      id: "id",
      name: "name",
      redirectUri: "otherRedirectUri",
    };

    const output = await runValidateDataWithApp(testedObject);

    expect(output).toEqual({ error: true });
  });
  test("Should return success When passed object is contained in app", async () => {
    const testedObject = {
      id: "id",
      name: "name",
      redirectUri: "redUri",
    };

    const output = await runValidateDataWithApp(testedObject);

    expect(output).toEqual({ success: true });
  });
});
