import { createBullBoard } from "@bull-board/api";
import { BullMQAdapter } from "@bull-board/api/bullMQAdapter";
import { ExpressAdapter } from "@bull-board/express";

import sampleQueue from "../queues/sample.queue";

const bullBoardAdapter = new ExpressAdapter();
bullBoardAdapter.setBasePath("/admin/ui");

createBullBoard({
  queues: [new BullMQAdapter(sampleQueue)],
  serverAdapter: bullBoardAdapter
});

export default bullBoardAdapter;
