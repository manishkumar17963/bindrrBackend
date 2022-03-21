import mongoose from "mongoose";
import { Response } from "express";
import CustomError from "./customError";
import { ValidationError } from "yup";
interface ExtendedError extends Error {
  code: number;
}
export default function checkError(err: any, res: Response) {
  console.log(err);
  if (err instanceof mongoose.Error) {
    return res.status(400).send({
      errorType: "Bad credentials",
      message: err.message,
    });
  }
  if (err.name == "MongoError") {
    if (err.code == 11000) {
      return res.status(400).send({
        errorType: "Duplicate credientials",
        message: err.message,
      });
    }
    return res.status(400).send({
      errorType: "Duplicate credientials",
      message: err.message,
    });
  }
  if (err.code == 21614) {
    return res.status(400).send({
      errorType: "Wrong Number",
      message: "Not Seem to be Invalid",
    });
  }
  if (err instanceof ValidationError) {
    return res.status(400).send({
      errorType: "Invalid Field",
      message: "Fields are Invalid",
    });
  }
  if (err.code == 21608) {
    return res.status(400).send({
      errorType: "Not verified",
      message: "Not verified Number ",
    });
  }
  if (err.name == "ClientError") {
    let castErr = err as unknown as CustomError;
    return res.status(castErr.status).send({
      errorType: castErr.errorType,
      message: castErr.message,
    });
  }
  return res.status(500).send({
    errorType: "Bad request",
    message: "internal server error",
  });
}

module.exports = checkError;
