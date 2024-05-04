import express from "express";

import { addSubmission } from "../../controller/submission.controller";
import { createSubmissionZodSchema } from "../../dtos/createSubmission.dto";
import { validator } from "../../validators/zod.validator";

const submissionRouter = express.Router();

submissionRouter.post("/", validator(createSubmissionZodSchema), addSubmission);

export default submissionRouter;
