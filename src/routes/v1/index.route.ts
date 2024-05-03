import express from "express";

import { pingCheck } from "../../controller/ping.controller";

const v1Router = express.Router();

v1Router.get("/ping", pingCheck);

export default v1Router;
