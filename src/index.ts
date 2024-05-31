import bodyParse from "body-parser";
import express from "express";

import bullBoardAdapter from "./config/bullBoard.config";
import { PORT } from "./config/server.config";
import SubmissionQueueProducer from "./producers/SubmissionQueue.producer";
import apiRouter from "./routes/index.route";
import { submission_queue } from "./utils/constants";
import SubmissionWorker from "./workers/Submission.worker";
const app = express();

app.use(bodyParse.urlencoded({ extended: true }));
app.use(bodyParse.json());
app.use(bodyParse.text());

app.use("/api", apiRouter);
app.use("/admin/ui", bullBoardAdapter.getRouter());

app.listen(PORT, () => {
  console.log(`server is started port at ${PORT}`);
  SubmissionWorker(submission_queue);

  // sampleQueueProducer("SampleJob", { name: "Rohit" }, 1);
  // sampleQueueProducer("SampleJob", { name: "Kumar" }, 2);
  // sampleQueueProducer("SampleJob", { name: "Shah" }, 1);
  const code = `
  #include<iostream>
  #include<stdio.h>
  using namespace std;
  int main(){
    int x;
    cin>>x;
    cout<<"value of x : " << x << endl;
    for(int i = 0; i < x; i++){
      cout << i << " ";
    }
    return 0;
  }
  
  `;
  const inputCase = `10`;
  SubmissionQueueProducer({
    "1234": {
      language: "cpp",
      inputCase,
      code
    }
  });
  // runCpp(code, test);
});
