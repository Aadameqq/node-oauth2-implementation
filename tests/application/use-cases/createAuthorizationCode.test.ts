import {
  createAuthorizationCode,
  CreateAuthorizationCodeProps,
} from "../../../src/application/use-cases/createAuthorizationCode";
import { App } from "../../../src/domain/entities/App";
import { AuthorizationCode } from "../../../src/domain/entities/AuthorizationCode";

describe("createAuthorizationCode use case", () => {
  const authorizationCodeRepositoryMock = {
    create: jest.fn(),
  };
  const codeMockValue = "randomCode";

  const codeGeneratorMockFunction = {
    generate: jest.fn().mockImplementation(() => codeMockValue),
  };

  const defaultTestApp = new App(
    "id",
    "name",
    "appOwId",
    ["perm1", "perm2"],
    "redirectUri",
    "secret"
  );

  const defaultTestProps = {
    redirectUri: defaultTestApp.redirectUri,
    application: defaultTestApp,
    resourceOwnerId: "owId",
  };

  const defaultTestAuthorizationCode = new AuthorizationCode(
    defaultTestProps.resourceOwnerId,
    defaultTestApp.id,
    codeMockValue,
    defaultTestApp.permissions
  );

  const runCreateAuthorizationCode = async (
    args: CreateAuthorizationCodeProps
  ) => {
    return createAuthorizationCode(
      authorizationCodeRepositoryMock,
      codeGeneratorMockFunction,
      args
    );
  };

  test("Should call repository method with required parameters", async () => {
    await runCreateAuthorizationCode(defaultTestProps);

    expect(authorizationCodeRepositoryMock.create).toBeCalledWith(
      defaultTestAuthorizationCode
    );
  });
  test("Should call generate code function", async () => {
    await runCreateAuthorizationCode(defaultTestProps);

    expect(codeGeneratorMockFunction.generate).toBeCalled();
  });
  test("Should return error When redirectUri is not the same as the application one", async () => {
    const output = await runCreateAuthorizationCode({
      ...defaultTestProps,
      redirectUri: "imother",
    });

    expect(output).toEqual({ error: true });
  });
  test("Should return string code When all parameters/props are valid", async () => {
    const output = await runCreateAuthorizationCode(defaultTestProps);

    expect(output).toEqual({ code: codeMockValue });
  });
});
