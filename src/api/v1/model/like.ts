import mongoose from "mongoose";

export interface LikeDocument extends mongoose.Document {
  artistName: string;

  postId: string;
  ownerId: string;
  artistId: string;
}

var LikeSchema = new mongoose.Schema(
  {
    artistName: {
      type: String,
      required: true,
    },

    artistId: { type: String, required: true },
    ownerId: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, required: true },
  },
  { timestamps: true }
);

const Like = mongoose.model<LikeDocument>("Like", LikeSchema);
export default Like;
