import sampleQueue from "../queues/sample.queue";

export default async function sampleQueueProducer(
  name: string,
  payload: Record<string, unknown>,
  priority: number
) {
  await sampleQueue.add(name, payload, { priority });
  console.log("Successfully add new job");
}
