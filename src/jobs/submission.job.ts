import { Job } from "bullmq";

import runCpp from "../containers/runCppDocker";
import runJava from "../containers/runJavaDocker";
import runPython from "../containers/runPythonDocker";
import { IJob } from "../types/bullMqJobDefination";
import { SubmissionPayload } from "../types/submissionPayload";

export default class SubmissionJob implements IJob {
  name: string;
  payload: Record<string, SubmissionPayload>;
  constructor(payload: Record<string, SubmissionPayload>) {
    this.payload = payload;
    this.name = this.constructor.name;
  }
  handle = async (job?: Job) => {
    console.log("handler of job called");
    console.log(this.payload);
    if (job) {
      const key = Object.keys(this.payload)[0];
      const data = this.payload[key];
      if (data.language === "cpp") {
        const res = await runCpp(data.code, data.inputCase);
        console.log("evaluated res ", res);
      } else if (data.language === "java") {
        runJava(data.code, data.inputCase);
      } else if (data.language === "python") {
        runPython(data.code, data.inputCase);
      }
    }
  };

  failed = (job?: Job) => {
    console.log("Job failed");
    if (job) {
      console.log("job failed", job.id);
    }
  };
}
