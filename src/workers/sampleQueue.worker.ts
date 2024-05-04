import { Job, Worker } from "bullmq";

import redisConnection from "../config/redis.config";
import SampleJob from "../jobs/Sample.job";

export default function SampleWorker(queueName: string) {
  new Worker(
    queueName,
    async (job: Job) => {
      console.log("sample job woker kicking");
      if (job.name === "SampleJob") {
        const sampleJobInstance = new SampleJob(job.data);
        sampleJobInstance.handle(job);
        return true;
      }
    },
    { connection: redisConnection }
  );
}
