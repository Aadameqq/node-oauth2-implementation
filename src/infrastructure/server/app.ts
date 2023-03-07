import express, { Application, RequestHandler } from "express";
import swaggerUI from "swagger-ui-express";
import router from "./router";
import * as errorMiddleware from "./middlewares/error.middleware";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const swaggerDocument = require(`../../../swagger.json`);

export const createApp = (): Application => {
  const app = express();

  app.use(express.json({ limit: "100kb" }));

  app.use("/api/docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument));

  app.use("/api/", router);

  app.use(errorMiddleware.notFound);
  app.use(errorMiddleware.catchErrors);
  return app;
};
