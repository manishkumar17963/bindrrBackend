import express from "express";
import { sendPresignedUrlHandler } from "../controller/sendPresignedUrl";

import authRequired from "../middleware/auth";
import Artist from "../model/artist";

const UrlRouter = express.Router();

UrlRouter.put(
  "/artist/presigned/url",
  authRequired(Artist),
  sendPresignedUrlHandler
);

export default UrlRouter;
