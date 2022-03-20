import mongoose from "mongoose";
import { MONGO_DB_NAME, MONGO_URI } from "./config";

export const connectDatabase = () =>
  mongoose.connect(
    `${MONGO_URI}/${MONGO_DB_NAME}`,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useFindAndModify: false,
    },
    (err) => {
      if (!err) return console.log("Connected to db!");
    }
  );
