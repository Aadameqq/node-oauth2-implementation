import express, { Application, RequestHandler } from "express";
import router from "./router";
import * as errorMiddleware from "./middlewares/error.middleware";

export const createApp = (): Application => {
  const app = express();

  app.use(express.json({ limit: "100kb" }));

  app.use("/api/", router);

  app.use(errorMiddleware.notFound);
  app.use(errorMiddleware.catchErrors);
  return app;
};
