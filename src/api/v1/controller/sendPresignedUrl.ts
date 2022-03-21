import { Request, Response } from "express";
import s3 from "../../../config/aws";
import { v4 as uuidv4 } from "uuid";

import checkError from "../helpers/checkErrors";

type PresignedUrl = { url: string; key: string };
const getSignedUrlPromise = (
  operation: string,
  params: { [key: string]: string }
): Promise<string> =>
  new Promise((resolve, reject) => {
    s3.getSignedUrl(operation, params, (err, url) => {
      err ? reject(err) : resolve(url);
    });
  });

export const sendPresignedUrlHandler = async (req: Request, res: Response) => {
  console.log("presignedurl");
  const presignedUrlList: PresignedUrl[] = [];
  let i: number;
  let num: number;
  let key: string;
  try {
    num = req.body.num ?? 1;

    for (i = 0; i < num; i++) {
      key = `customer/${req.user!._id}/${uuidv4()}.jpeg`;

      const url = await getSignedUrlPromise("putObject", {
        Bucket: "ecommerce-images",
        ContentType: "image/jpeg",
        Key: key,
        // ContentDisposition: "attachment",
        ACL: "public-read",
      });
      presignedUrlList.push({ url, key });
    }
    console.log("presignedurl", presignedUrlList);
    res.send(presignedUrlList).status(201);
  } catch (err) {
    checkError(err, res);
  }
};
