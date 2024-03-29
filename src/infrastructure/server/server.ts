import * as dotenv from "dotenv";
import { createApp } from "./app";
import { connectDatabase } from "./connect";
// eslint-disable-next-line @typescript-eslint/no-var-requires

dotenv.config();

const PORT = process.env.PORT || 5000;

connectDatabase();

const app = createApp();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`> Ready on http://localhost:${PORT}`);
});
