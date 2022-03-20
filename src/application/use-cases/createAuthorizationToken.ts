import { ISignTokenManager } from "../../domain/interfaces/ISignTokenManager";
import { IGetNameAuthorizer } from "../../domain/interfaces/IGetNameAuthorizer";

export interface ICreateAuthorizationProps {
  resourceOwnerId: string;
  clientId: string;
  permissions: string[];
}

export const createAuthorizationToken = async (
  accessTokenManager: ISignTokenManager,
  refreshTokenManager: ISignTokenManager,
  { resourceOwnerId, clientId, permissions }: ICreateAuthorizationProps
) => {
  const isAccount = resourceOwnerId === clientId;

  const accessToken = await accessTokenManager.sign(
    resourceOwnerId,
    clientId,
    permissions,
    isAccount
  );

  const refreshToken = await refreshTokenManager.sign(
    resourceOwnerId,
    clientId,
    permissions,
    isAccount
  );

  return { accessToken, refreshToken };
};
