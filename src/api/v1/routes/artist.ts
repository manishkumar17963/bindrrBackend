import express from "express";
import {
  addLikeHandler,
  addPostHandler,
  getInitialAuthDataHandler,
  getInitialUnAuthDataHandler,
  removeLikeHandler,
} from "../controller/artist";

import authRequired from "../middleware/auth";

import Artist from "../model/artist";
const ArtistRouter = express.Router();

ArtistRouter.post("/add/post", authRequired(Artist), addPostHandler);

ArtistRouter.post(
  "/initial/auth/data",
  authRequired(Artist),
  getInitialAuthDataHandler
);

ArtistRouter.post(
  "/initial/unauth/data",

  getInitialUnAuthDataHandler
);

ArtistRouter.post("/add/like/:postId", authRequired(Artist), addLikeHandler);

ArtistRouter.post(
  "/remove/like/:postId",
  authRequired(Artist),
  removeLikeHandler
);

export default ArtistRouter;
