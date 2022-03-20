import { Authorization } from "../../../src/domain/entities/Authorization";
import { authorizeAccess } from "../../../src/application/use-cases/authorizeAccess";

describe("authorizeAccess Use Case", () => {
  const testAuthorization = new Authorization(
    "ownerId",
    "clientId",
    "token",
    ["permission", "permission2"],
    false
  );
  const authorizerMock = {
    hasAccess: jest
      .fn()
      .mockImplementation((permissions) => permissions.includes("permission")),
  };

  const tokenManagerMock = {
    getData: jest.fn().mockImplementation((token) => testAuthorization),

    verify: jest.fn().mockImplementation((token) => ({
      isValid: true,
    })),
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("Should call authorizer hasAccess method with required params When ran use case", async () => {
    await authorizeAccess(
      authorizerMock,
      tokenManagerMock,
      testAuthorization.token
    );

    expect(authorizerMock.hasAccess).toBeCalledWith(
      testAuthorization.permissions
    );
  });

  test("Should call tokenManager getData method with required params When ran use case", async () => {
    await authorizeAccess(
      authorizerMock,
      tokenManagerMock,
      testAuthorization.token
    );

    expect(tokenManagerMock.getData).toBeCalledWith(testAuthorization.token);
  });
  test("Should call tokenManager verify method with required params When ran use case", async () => {
    await authorizeAccess(
      authorizerMock,
      tokenManagerMock,
      testAuthorization.token
    );

    expect(tokenManagerMock.verify).toBeCalledWith(testAuthorization.token);
  });
  test("Should return error When token is invalid", async () => {
    tokenManagerMock.verify.mockImplementationOnce((token) => ({
      isValid: false,
    }));

    const output = await authorizeAccess(
      authorizerMock,
      tokenManagerMock,
      "im invalid :("
    );

    expect(output).toEqual({ granted: false });
  });
  test("Should return error When token doesn't contain id", async () => {
    tokenManagerMock.getData.mockImplementationOnce((token) => null);

    const output = await authorizeAccess(
      authorizerMock,
      tokenManagerMock,
      testAuthorization.token
    );

    expect(output).toEqual({ granted: false });
  });

  test("Should grand access and return authorization object When all data is valid and authorizer method returns success", async () => {
    const output = await authorizeAccess(
      authorizerMock,
      tokenManagerMock,
      testAuthorization.token
    );

    expect(output).toEqual({ granted: true, payload: testAuthorization });
  });
  test("Should return error When authorizer method returns error", async () => {
    authorizerMock.hasAccess.mockImplementationOnce((permissions) => false);
    const output = await authorizeAccess(
      authorizerMock,
      tokenManagerMock,
      testAuthorization.token
    );

    expect(output).toEqual({ granted: false });
  });

  test("Should grand access When isAccount is true and account doesn't have any permissions", async () => {
    const expectedAuthorization = new Authorization(
      testAuthorization.resourceOwnerId,
      testAuthorization.clientId,
      testAuthorization.token,
      [],
      true
    );

    tokenManagerMock.getData.mockImplementationOnce(
      () => expectedAuthorization
    );
    const output = await authorizeAccess(
      authorizerMock,
      tokenManagerMock,
      testAuthorization.token
    );

    expect(output).toEqual({ granted: true, payload: expectedAuthorization });
  });
  test("Should not grant access When object returned by token manager method is not instance of authorization entity", async () => {
    const expectedAuthorization = {
      hello: "hi",
    };

    tokenManagerMock.getData.mockImplementationOnce(
      () => expectedAuthorization
    );
    const output = await authorizeAccess(
      authorizerMock,
      tokenManagerMock,
      testAuthorization.token
    );

    expect(output).toEqual({ granted: false });
  });
});
