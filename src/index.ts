import express from "express";

import { PORT } from "./config/server.config";
const app = express();

app.listen(PORT, () => {
  console.log(`server is started port at ${PORT}`);
});
