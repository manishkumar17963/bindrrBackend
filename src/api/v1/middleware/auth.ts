import jwt, { decode } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import { Document, Model } from "mongoose";
import CustomJwtPayload from "../interfaces/jwtPayload";

import CustomError from "../helpers/customError";
import checkError from "../helpers/checkErrors";
import Artist, { ArtistDocument } from "../model/artist";

declare global {
  namespace Express {
    interface Request {
      user?: ArtistDocument;
      token?: string;
      number?: string;
      admin?: boolean;
    }
  }
}

const authRequired =
  (model: Model<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req
        .header("Authorization")
        ?.replace("Bearer ", "") as string;
      console.log("token", token);
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as CustomJwtPayload;
      console.log(decoded);

      const user = await Artist.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });
      console.log("user", user);

      if (!user) {
        throw new CustomError("Bad request", 401, "Please Authenticate first");
      }

      req.token = token;

      req.user = user;
      req.number = user._id;
      console.log("user", user);
      next();
    } catch (err) {
      checkError(err, res);
    }
  };

export const bodyAuthRequired =
  (model: Model<any>) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const token = req.body.Authorization?.replace("Bearer ", "") as string;

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET as string
      ) as CustomJwtPayload;

      const user = await model.findOne({
        _id: decoded._id,
        "tokens.token": token,
      });

      if (!user) {
        throw new CustomError("Bad request", 401, "Please Authenticate first");
      }

      req.token = token;

      req.user = user;
      req.number = user._id;
      next();
    } catch (err) {
      checkError(err, res);
    }
  };

export default authRequired;
