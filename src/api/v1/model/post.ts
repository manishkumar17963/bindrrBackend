import mongoose from "mongoose";
import PointLocation from "../interfaces/pointLocation";
import { ArtistDocument } from "./artist";
import { PointSchema } from "./common";

export interface PostDocument extends mongoose.Document {
  caption?: string;
  imageUri: string;
  ownerId: string;
  ownerName: string;
  location?: PointLocation;
}

var PostSchema = new mongoose.Schema(
  {
    caption: {
      type: String,
      required: () => {
        //@ts-ignore
        !this.owner;
      },
    },
    state: String,

    ownerId: {
      type: String,
      required: true,
    },
    ownerName: {
      type: String,
      required: true,
    },
    location: PointSchema,

    imageUri: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

PostSchema.index({
  location: "2dsphere",
});

const Post = mongoose.model<PostDocument>("Post", PostSchema);
export default Post;
