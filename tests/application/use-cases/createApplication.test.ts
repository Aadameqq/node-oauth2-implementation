import { App } from "../../../src/domain/entities/App";
import { createApplication } from "../../../src/application/use-cases/createApplication";

describe("readApplication use case", () => {
  const testApp = new App("id", "name", "ownerId", [], "", "secret");

  const expectedApp = {
    ...testApp,
    id: "genId",
    secret: "genSecret",
  };

  const appRepositoryMock = {
    create: jest.fn().mockImplementation((app) => app),
  };

  const idGeneratorMock = {
    generate: jest.fn().mockImplementation(() => expectedApp.id),
  };
  const secretGeneratorMock = {
    generate: jest.fn().mockImplementation(() => expectedApp.secret),
  };

  const runCreateApplication = (args: any) => {
    return createApplication(
      appRepositoryMock,
      idGeneratorMock,
      secretGeneratorMock,
      args
    );
  };

  test("Should call repository method with required parameters", async () => {
    await runCreateApplication({ ...testApp });

    expect(appRepositoryMock.create).toBeCalledWith(expectedApp);
  });
  test("Should call id generator with required parameters", async () => {
    await runCreateApplication({ ...testApp });

    expect(idGeneratorMock.generate).toBeCalled();
  });
  test("Should call secret generator with required parameters", async () => {
    await runCreateApplication({ ...testApp });

    expect(secretGeneratorMock.generate).toBeCalled();
  });
  test("Should return expected app object When all parameters are passed", async () => {
    const response = await runCreateApplication({ ...testApp });

    expect(response).toEqual({ application: expectedApp });
  });
});
