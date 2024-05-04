import { Request, Response } from "express";

import { CreateSubmissionDto } from "../dtos/createSubmission.dto";

export function addSubmission(req: Request, res: Response) {
  const submissionDto = req.body as CreateSubmissionDto;
  console.log(submissionDto);
  // TODO : Add validation using zod

  return res.status(201).json({
    success: true,
    error: false,
    message: "successfully collected the submission",
    data: submissionDto
  });
}
