import { AuthorizationCode } from "../../../src/domain/entities/AuthorizationCode";
import {
  getAuthorizationDataFromCode,
  GetAuthorizationDataFromCodeProps,
} from "../../../src/application/use-cases/getAuthorizationDataFromCode";
import { App } from "../../../src/domain/entities/App";

describe("getAuthorizationDataFromCode", () => {
  const defaultTestAuthorizationCode = new AuthorizationCode(
    "rOwId",
    "cId",
    "code",
    ["perm1", "perm2"]
  );
  const testApp = new App(
    defaultTestAuthorizationCode.clientId,
    "name",
    "ownerId",
    [],
    "redUri",
    "secret"
  );

  const authorizationCodeRepositoryMock = {
    readAndDelete: jest
      .fn()
      .mockImplementation(
        (code) =>
          code === defaultTestAuthorizationCode.code &&
          defaultTestAuthorizationCode
      ),
  };

  const defaultParams = {
    code: defaultTestAuthorizationCode.code,
    application: testApp,
    appSecret: testApp.secret,
    appRedirectUri: testApp.redirectUri,
  };

  const runGetAuthorizationDataFromCode = (
    args?: GetAuthorizationDataFromCodeProps
  ) => {
    return getAuthorizationDataFromCode(
      authorizationCodeRepositoryMock,
      args || defaultParams
    );
  };

  test("Should call authorization code repository with required parameters", async () => {
    await runGetAuthorizationDataFromCode();

    expect(authorizationCodeRepositoryMock.readAndDelete).toBeCalledWith(
      defaultTestAuthorizationCode.code
    );
  });
  test("Should return error When code doesn't exist in repository", async () => {
    const output = await runGetAuthorizationDataFromCode({
      ...defaultParams,
      code: "idontexist",
    });

    expect(output).toEqual({ error: true });
  });
  test("Should return authorization code object When code is found in repository", async () => {
    const output = await runGetAuthorizationDataFromCode();

    expect(output).toEqual({ authorizationCode: defaultTestAuthorizationCode });
  });
  test("Should error When given app secret is not the same as the one from app entity", async () => {
    const output = await runGetAuthorizationDataFromCode({
      ...defaultParams,
      appSecret: "invalid",
    });

    expect(output).toEqual({ error: true });
  });
  test("Should error When given app redirect uri is not the same as the one from app entity", async () => {
    const output = await runGetAuthorizationDataFromCode({
      ...defaultParams,
      appRedirectUri: "invalid",
    });

    expect(output).toEqual({ error: true });
  });
});
