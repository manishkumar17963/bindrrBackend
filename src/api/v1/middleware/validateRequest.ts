import { AnySchema } from "yup";
import { Request, Response, NextFunction } from "express";

const validate =
  (schema: AnySchema) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validate({
        body: req.body,
        query: req.query,
        params: req.params,
        headers: req.headers,
      });

      return next();
    } catch (err:any) {
      console.log(err);
      return res.status(400).send(err.errors);
    }
  };

export default validate;
