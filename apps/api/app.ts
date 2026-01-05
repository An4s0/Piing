import dotenvx from "@dotenvx/dotenvx-ops";
import { fileURLToPath } from "url";

dotenvx.config({
  path: fileURLToPath(new URL("../../.env", import.meta.url)),
});

import express from "express";
import cors from "cors";
import routes from "./routes";
import {
  ErrorHandler,
  Logger,
  RateLimiter,
  checkContentType,
} from "./middlewares";

const app = express();

app.use(Logger);
app.use(cors());
app.use(checkContentType);
app.use(express.json());
app.use(RateLimiter);
app.use(routes);
app.use(ErrorHandler);

app.listen(process.env.API_PORT, async () => {
  console.log(
    `   \x1b[32m➜\x1b[0m  Local:   \x1b[36mhttp://localhost:${process.env.API_PORT}\x1b[0m`
  );
});
