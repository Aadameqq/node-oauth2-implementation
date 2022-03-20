import { Authorization } from "../../domain/entities/Authorization";
import { IVerifyAndGetDataTokenManager } from "../../domain/interfaces/IVerifyAndGetDataTokenManager";
import { IHasAccessAuthorizer } from "../../domain/interfaces/IHasAccessAuthorizer";

export const authorizeAccess = async (
  Authorizer: IHasAccessAuthorizer,
  tokenManager: IVerifyAndGetDataTokenManager,
  token: string
) => {
  const tokenVerification = await tokenManager.verify(token);

  if (!tokenVerification.isValid) return { granted: false };

  const authorization = await tokenManager.getData(token);

  if (!authorization || !(authorization instanceof Authorization))
    return { granted: false };

  if (!authorization.isAccount) {
    const hasAccess = Authorizer.hasAccess(authorization.permissions);

    if (!hasAccess) return { granted: false };
  }

  return { granted: true, payload: authorization };
};
