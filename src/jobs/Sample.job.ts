import { Job } from "bullmq";

import { IJob } from "../types/bullMqJobDefination";

export default class SampleJob implements IJob {
  name: string;
  payload: Record<string, unknown>;
  constructor(payload: Record<string, unknown>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }
  handle = (job?: Job) => {
    console.log("handler of job called");
    console.log(this.payload);
    if (job) {
      console.log(job.name, job.id, job.data);
    }
  };

  failed = (job?: Job) => {
    console.log("Job failed");
    if (job) {
      console.log("job failed", job.id);
    }
  };
}
