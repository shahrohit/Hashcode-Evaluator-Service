import bodyParse from "body-parser";
import express from "express";

import bullBoardAdapter from "./config/bullBoard.config";
import { PORT } from "./config/server.config";
// import sampleQueueProducer from "./producers/sampleQueue.producer";
import apiRouter from "./routes/index.route";
import SampleWorker from "./workers/sampleQueue.worker";
const app = express();

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.use(bodyParse.text());

app.use("/api", apiRouter);
app.use("/admin/ui", bullBoardAdapter.getRouter());

app.listen(PORT, () => {
  console.log(`server is started port at ${PORT}`);
  SampleWorker("SampleQueue");
});
