import { App } from "../../../src/domain/entities/App";
import {
  readApplication,
  ReadApplicationProps,
} from "../../../src/application/use-cases/readApplication";

describe("readApplication use case", () => {
  const testApp = new App(
    "id",
    "name",
    "ownerId",
    ["perm1", "perm2"],
    "redirectUri",
    "secret"
  );

  const appRepositoryMock = {
    read: jest.fn().mockImplementation((id) => id === testApp.id && testApp),
    create: jest.fn(),
  };

  const runReadApplication = (args?: ReadApplicationProps) => {
    return readApplication(appRepositoryMock, args || { id: testApp.id });
  };

  test("Should call app repository read method with required params", async () => {
    await runReadApplication();

    expect(appRepositoryMock.read).toBeCalledWith(testApp.id);
  });
  test("Should return app object When app is found in repository", async () => {
    const output = await runReadApplication();

    expect(output).toEqual({ application: testApp });
  });
  test("Should return error When app doesn't exist in repository", async () => {
    const output = await runReadApplication({ id: "idontexist" });

    expect(output).toEqual({ error: true });
  });
});
