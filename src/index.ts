require("dotenv").config();
import express from "express";
import connect from "./config/databaseConfig";
import morgan from "morgan";

import ArtistRouter from "./api/v1/routes/artist";
import UrlRouter from "./api/v1/routes/url";

const port = parseInt(process.env.PORT as string);
const host = process.env.HOST_NAME as string;
const start = async () => {
  try {
    await connect();
    let app = express();

    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(function (req, res, next) {
      res.header("Access-Control-Allow-Credentials", "true");
      res.header("Access-Control-Allow-Origin", req.headers.origin);
      res.header(
        "Access-Control-Allow-Methods",
        "GET,PUT,POST,DELETE,UPDATE,OPTIONS"
      );
      res.header(
        "Access-Control-Allow-Headers",
        "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept,Authorization"
      );
      next();
    });
    app.use(morgan("dev"));
    app.use("/artist", ArtistRouter);
    app.use(UrlRouter);

    app.listen(port, "0.0.0.0", () => {
      console.log(`running on port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};
start();
