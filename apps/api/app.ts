import dotenvx from "@dotenvx/dotenvx-ops";
import path from "path";

dotenvx.config({
  path: path.resolve(__dirname, "../../.env"),
});

import express from "express";
import cors from "cors";
import routes from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.API_PORT, async () => {
  console.log(
    `   \x1b[32m➜\x1b[0m  Local:   \x1b[36mhttp://localhost:${process.env.API_PORT}\x1b[0m`
  );
});
