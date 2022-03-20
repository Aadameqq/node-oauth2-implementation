import express, { Response, Request } from "express";
import catchAsyncError from "../utils/catchAsyncError";
import { CreateApplicationController } from "../../../adapters/controllers/CreateApplicationController";
import { ApplicationRepositoryMongodb } from "../../mongodb/repositories/ApplicationRepositoryMongodb";
import { IdGenerator } from "../../utils/IdGenerator";
import { AccessTokenManager } from "../../utils/AccessTokenManager";
import { AlwaysNoAccessAuthorizer } from "../../../application/authorizers/AlwaysNoAccessAuthorizer";
import { CreateApplicationPresenter } from "../../../adapters/presenters/CreateApplicationPresenter";
import {
  IUpdateApplicationControllerRequest,
  UpdateApplicationController,
} from "../../../adapters/controllers/UpdateApplicationController";
import { UpdateApplicationPresenter } from "../../../adapters/presenters/UpdateApplicationPresenter";
import {
  ChangeApplicationSecretController,
  IChangeApplicationSecretControllerRequest,
} from "../../../adapters/controllers/ChangeApplicationSecretController";
import { ChangeApplicationSecretPresenter } from "../../../adapters/presenters/ChangeApplicationSecretPresenter";

const router = express.Router();

router.post(
  "/",
  catchAsyncError(async (req: Request, res: Response) => {
    const createController = new CreateApplicationController();

    const response = await createController.handle(
      new ApplicationRepositoryMongodb(),
      new IdGenerator(),
      new IdGenerator(22),
      new AccessTokenManager(),
      new AlwaysNoAccessAuthorizer(),
      new CreateApplicationPresenter(),
      req
    );
    res.status(response.statusCode).json(response.body);
  })
);
router.put(
  "/secret/:id",
  catchAsyncError(async (req: Request, res: Response) => {
    const updateController = new ChangeApplicationSecretController();

    const response = await updateController.handle(
      new ApplicationRepositoryMongodb(),
      new IdGenerator(22),
      req as unknown as IChangeApplicationSecretControllerRequest,
      new ChangeApplicationSecretPresenter(),
      new AccessTokenManager()
    );

    res.sendStatus(response.statusCode);
  })
);
router.put(
  "/:id",
  catchAsyncError(async (req: Request, res: Response) => {
    const updateController = new UpdateApplicationController();

    const response = await updateController.handle(
      new ApplicationRepositoryMongodb(),
      new AccessTokenManager(),
      req as unknown as IUpdateApplicationControllerRequest,

      new UpdateApplicationPresenter()
    );

    res.sendStatus(response.statusCode);
  })
);

export default router;
