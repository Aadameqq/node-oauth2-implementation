// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import jwt from "jsonwebtoken";
import { ISignTokenManager } from "../../domain/interfaces/ISignTokenManager";

const { REFRESH_TOKEN_SECRET } = process.env;

export class RefreshTokenManager implements ISignTokenManager {
  sign(
    resourceOwnerId: string,
    clientId: string,
    permissions: string[],
    isAccount: boolean
  ): Promise<string> {
    const token = jwt.sign(
      { resourceOwnerId, clientId, permissions, isAccount },
      REFRESH_TOKEN_SECRET
    );

    return token;
  }
}
