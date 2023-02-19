// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import jwt from "jsonwebtoken";
import { ISignTokenManager } from "../../domain/interfaces/ISignTokenManager";
import { IVerifyAndGetDataTokenManager } from "../../domain/interfaces/IVerifyAndGetDataTokenManager";
import { Authorization } from "../../domain/entities/Authorization";

const { ACCESS_TOKEN_SECRET } = process.env;

export class AccessTokenManager
  implements ISignTokenManager, IVerifyAndGetDataTokenManager
{
  sign = (
    resourceOwnerId: string,
    clientId: string,
    permissions: string[],
    isAccount: boolean
  ) => {
    const token = jwt.sign(
      { resourceOwnerId, clientId, permissions, isAccount },
      ACCESS_TOKEN_SECRET
    );

    return token;
  };

  async getData(token: string): Promise<Authorization | null> {
    const { payload } = jwt.decode(token, { complete: true });

    const authorization = new Authorization(
      payload.resourceOwnerId,
      payload.clientId,
      token,
      payload.permissions,
      payload.isAccount
    );

    return authorization;
  }

  async verify(token: string): Promise<{ isValid: boolean }> {
    return { isValid: !!jwt.verify(token, ACCESS_TOKEN_SECRET) };
  }
}
