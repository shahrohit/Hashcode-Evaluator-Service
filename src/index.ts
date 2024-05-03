import express from "express";

import { PORT } from "./config/server.config";
import apiRouter from "./routes/index.route";
const app = express();

app.use("/api", apiRouter);

app.listen(PORT, () => {
  console.log(`server is started port at ${PORT}`);
});
