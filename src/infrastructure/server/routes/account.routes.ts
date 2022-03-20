import express, { Response, Request } from "express";
import { AccountRepositoryMongodb } from "../../mongodb/repositories/AccountRepositoryMongodb";
import { AccessTokenManager } from "../../utils/AccessTokenManager";
import { RefreshTokenManager } from "../../utils/RefreshTokenManager";
import { PasswordHasher } from "../../utils/PasswordHasher";
import catchAsyncError from "../utils/catchAsyncError";
import { RegisterAccountController } from "../../../adapters/controllers/RegisterAccountController";
import { IdGenerator } from "../../utils/IdGenerator";
import { RegisterAccountPresenter } from "../../../adapters/presenters/RegisterAccountPresenter";
import { LoginAccountController } from "../../../adapters/controllers/LoginAccountController";
import { LoginAccountPresenter } from "../../../adapters/presenters/LoginAccountPresenter";
import {
  IReadAccountNicknameControllerRequest,
  ReadAccountNicknameController,
} from "../../../adapters/controllers/ReadAccountNicknameController";
import { ReadAccountNicknamePresenter } from "../../../adapters/presenters/ReadAccountNicknamePresenter";
import { IChangeAccountNicknamePresenter } from "../../../domain/interfaces/IChangeAccountNicknamePresenter";
import {
  ChangeAccountNicknameController,
  IChangeAccountNicknameControllerRequest,
} from "../../../adapters/controllers/ChangeAccountNicknameController";
import { ChangeAccountNicknamePresenter } from "../../../adapters/presenters/ChangeAccountNicknamePresenter";

const router = express.Router();

router.post(
  "/login/",
  catchAsyncError(async (req: Request, res: Response) => {
    const loginController = new LoginAccountController();
    const response = await loginController.handle(
      new LoginAccountPresenter(),
      new AccountRepositoryMongodb(),
      new AccessTokenManager(),
      new RefreshTokenManager(),
      new PasswordHasher(),
      req
    );

    res.status(response.statusCode).json(response.body);
  })
);
router.post(
  "/register/",
  catchAsyncError(async (req: Request, res: Response) => {
    const registerController = new RegisterAccountController();

    const response = await registerController.handle(
      new AccountRepositoryMongodb(),
      new PasswordHasher(),
      new IdGenerator(),
      new RegisterAccountPresenter(),
      req
    );

    res.status(response.statusCode).send(response.message);
  })
);
router.get(
  "/nickname",
  catchAsyncError(async (req: Request, res: Response) => {
    const readNicknameController = new ReadAccountNicknameController();

    const response = await readNicknameController.handle(
      new AccessTokenManager(),
      new AccountRepositoryMongodb(),
      req as unknown as IReadAccountNicknameControllerRequest,
      new ReadAccountNicknamePresenter()
    );

    res.status(response.statusCode).json(response.body);
  })
);
router.put(
  "/nickname",
  catchAsyncError(async (req: Request, res: Response) => {
    const changeNicknameController = new ChangeAccountNicknameController();

    const response = await changeNicknameController.handle(
      new AccessTokenManager(),
      new AccountRepositoryMongodb(),
      req as unknown as IChangeAccountNicknameControllerRequest,
      new ChangeAccountNicknamePresenter()
    );

    res.status(response.statusCode).json(response.body);
  })
);

export default router;
