import { object, string, array, ref, number, boolean, date } from "yup";

export const createPostSchema = object({
  body: object({
    caption: string(),
    postUri: string(),
  }),
});
