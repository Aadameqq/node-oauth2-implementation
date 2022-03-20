import express, { Response, Request } from "express";
import catchAsyncError from "../utils/catchAsyncError";
import {
  AuthorizeApplicationController,
  IAuthorizeApplicationControllerRequest,
} from "../../../adapters/controllers/AuthorizeApplicationController";
import { AlwaysNoAccessAuthorizer } from "../../../application/authorizers/AlwaysNoAccessAuthorizer";
import { AccessTokenManager } from "../../utils/AccessTokenManager";
import { ApplicationRepositoryMongodb } from "../../mongodb/repositories/ApplicationRepositoryMongodb";
import { IdGenerator } from "../../utils/IdGenerator";
import { AuthorizeApplicationPresenter } from "../../../adapters/presenters/AuthorizeApplicationPresenter";
import { AuthorizationCodeRepositoryMongodb } from "../../mongodb/repositories/AuthorizationCodeRepositoryMongodb";
import {
  ExchangeCodeForTokenController,
  IExchangeCodeForTokenControllerRequest,
} from "../../../adapters/controllers/ExchangeCodeForTokenController";
import { RefreshTokenManager } from "../../utils/RefreshTokenManager";
import { ExchangeCodeForTokenPresenter } from "../../../adapters/presenters/ExchangeCodeForTokenPresenter";

const router = express.Router();

router.post(
  "/authorize/",
  catchAsyncError(async (req: Request, res: Response) => {
    const authAppController = new AuthorizeApplicationController();

    const response = await authAppController.handle(
      new AlwaysNoAccessAuthorizer(),
      new AccessTokenManager(),
      new ApplicationRepositoryMongodb(),
      new AuthorizationCodeRepositoryMongodb(),
      new IdGenerator(9),
      new AuthorizeApplicationPresenter(),
      req as unknown as IAuthorizeApplicationControllerRequest
    );

    res.status(200).json({ redirect: response.redirect });
  })
);
router.get(
  "/oauth2/token",
  catchAsyncError(async (req: Request, res: Response) => {
    const exchangeCodeForTokenController = new ExchangeCodeForTokenController();

    const response = await exchangeCodeForTokenController.handle(
      new ApplicationRepositoryMongodb(),
      new AuthorizationCodeRepositoryMongodb(),
      new AccessTokenManager(),
      new RefreshTokenManager(),
      req as unknown as IExchangeCodeForTokenControllerRequest,
      new ExchangeCodeForTokenPresenter()
    );

    res.status(response.statusCode).json(response.body);
  })
);

export default router;
