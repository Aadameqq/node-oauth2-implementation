import { App } from "../../../src/domain/entities/App";
import { createApplication } from "../../../src/application/use-cases/createApplication";
import { updateApplication } from "../../../src/application/use-cases/updateApplication";

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
    update: jest.fn().mockImplementation((id) => id === testApp.id && testApp),
  };

  const runUpdateApplication = (args: any) => {
    return updateApplication(appRepositoryMock, args);
  };

  test("Should call repository method with required parameters", async () => {
    await runUpdateApplication(testApp);

    expect(appRepositoryMock.update).toBeCalledWith(
      testApp.id,
      testApp.name,
      testApp.redirectUri,
      testApp.permissions
    );
  });

  test("Should return error When app doesn't exist", async () => {
    const response = await runUpdateApplication({ ...testApp, id: "invalid" });

    expect(response).toEqual({ error: true });
  });
  test("Should return updated app When app exists", async () => {
    const response = await runUpdateApplication(testApp);

    expect(response).toEqual({ application: testApp });
  });
});
