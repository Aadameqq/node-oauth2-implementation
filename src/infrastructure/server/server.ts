import { createApp } from "./app";
import { connectDatabase } from "./connect";

const PORT = 5000;

connectDatabase();

const app = createApp();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`> Ready on http://localhost:${PORT}`);
});
