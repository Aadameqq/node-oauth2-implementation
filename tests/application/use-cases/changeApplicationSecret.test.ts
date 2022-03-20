import { App } from "../../../src/domain/entities/App";
import { updateApplication } from "../../../src/application/use-cases/updateApplication";
import { createApplication } from "../../../src/application/use-cases/createApplication";
import { changeApplicationSecret } from "../../../src/application/use-cases/changeApplicationSecret";

describe("readApplication use case", () => {
  const testApp = new App(
    "id",
    "newName",
    "ownerId",
    ["perm1"],
    "new redirect uri",
    "secret"
  );

  const appRepositoryMock = {
    updateSecret: jest
      .fn()
      .mockImplementation((id) => id === testApp.id && testApp),
  };

  const secretGeneratorMock = {
    generate: jest.fn().mockImplementation(() => testApp.secret),
  };

  const runChangeApplicationSecret = (args: any) => {
    return changeApplicationSecret(
      appRepositoryMock,
      secretGeneratorMock,
      args
    );
  };

  test("Should call repository method with all required parameters", async () => {
    await runChangeApplicationSecret({ id: testApp.id });

    expect(appRepositoryMock.updateSecret).toBeCalledWith(
      testApp.id,
      testApp.secret
    );
  });
  test("Should call secret generator method", async () => {
    await runChangeApplicationSecret({ id: testApp.id });

    expect(appRepositoryMock.updateSecret).toBeCalled();
  });
  test("Should return error When app doesn't exist", async () => {
    const response = await runChangeApplicationSecret({ id: "invalid" });

    expect(response).toEqual({ error: true });
  });
  test("Should return new secret WHen app exists", async () => {
    const response = await runChangeApplicationSecret({ id: testApp.id });

    expect(response).toEqual({ success: true, secret: testApp.secret });
  });
});
