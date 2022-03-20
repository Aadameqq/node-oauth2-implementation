import express from "express";
import accountRoutes from "./routes/account.routes";
import appRoutes from "./routes/app.routes";
import oauthRoutes from "./routes/oauth.routes";

const mainRouter = express.Router();

mainRouter.use("/account/", accountRoutes);
mainRouter.use("/app/", appRoutes);
mainRouter.use("/", oauthRoutes);

export default mainRouter;
