import SubmissionQueue from "../queues/submission.queue";

export default async function SubmissionQueueProducer(
  payload: Record<string, unknown>
) {
  await SubmissionQueue.add("SubmissionJob", payload);
  console.log("Successfully add new job");
}
