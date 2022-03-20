import { createAuthorizationToken } from "../../../src/application/use-cases/createAuthorizationToken";
import { Authorization } from "../../../src/domain/entities/Authorization";

describe("createAuthorizationToken Use Case", () => {
  const firstPermission = "perm1";
  const secondPermission = "perm2";

  const testAuthorizationProps = {
    clientId: "clientId",
    resourceOwnerId: "ownerId",
    permissions: [firstPermission, secondPermission],
  };

  const authorizationObject = new Authorization(
    "ownerId",
    "clientId",
    "token",
    [firstPermission, secondPermission],
    false
  );

  const testToken = "helloimtoken";
  const testRefreshToken = "helloimrefreshtoken";

  const tokenManagerMock = {
    sign: jest.fn().mockImplementation(() => testToken),
  };
  const refreshTokenManagerMock = {
    sign: jest.fn().mockImplementation(() => testRefreshToken),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  const runCreateAuthorizationToken = async (args?: any) => {
    return createAuthorizationToken(
      tokenManagerMock,
      refreshTokenManagerMock,
      args || testAuthorizationProps
    );
  };

  test("Should call access token method with required params", async () => {
    await runCreateAuthorizationToken();

    expect(tokenManagerMock.sign).toBeCalledWith(
      authorizationObject.resourceOwnerId,
      authorizationObject.clientId,
      authorizationObject.permissions,
      authorizationObject.isAccount
    );
  });
  test("Should call refresh token method with required params", async () => {
    await runCreateAuthorizationToken();

    expect(refreshTokenManagerMock.sign).toBeCalledWith(
      authorizationObject.resourceOwnerId,
      authorizationObject.clientId,
      authorizationObject.permissions,
      authorizationObject.isAccount
    );
  });
  test("Should return tokens When all params has been passed", async () => {
    const auth = await runCreateAuthorizationToken();

    expect(auth).toEqual({
      accessToken: testToken,
      refreshToken: testRefreshToken,
    });
  });

  test("Should call access token method with required params and isAccount set to true When owner id and client id are the same", async () => {
    const expectedAuthorizationObject = {
      resourceOwnerId: "same",
      clientId: "same",
      permissions: authorizationObject.permissions,
    };

    await runCreateAuthorizationToken(expectedAuthorizationObject);

    expect(tokenManagerMock.sign).toBeCalledWith(
      expectedAuthorizationObject.resourceOwnerId,
      expectedAuthorizationObject.clientId,
      authorizationObject.permissions,
      true
    );
  });
  test("Should call refresh token method with required params and isAccount set to true When owner id and client id are the same", async () => {
    const expectedAuthorizationObject = {
      resourceOwnerId: "same",
      clientId: "same",
      permissions: authorizationObject.permissions,
    };

    await runCreateAuthorizationToken(expectedAuthorizationObject);

    expect(refreshTokenManagerMock.sign).toBeCalledWith(
      expectedAuthorizationObject.resourceOwnerId,
      expectedAuthorizationObject.clientId,
      authorizationObject.permissions,
      true
    );
  });
});
