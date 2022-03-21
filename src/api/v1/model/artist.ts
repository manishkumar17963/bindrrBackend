import mongoose from "mongoose";

import BaseIdentifier from "../interfaces/baseIdentifier";

export interface ArtistDocument extends mongoose.Document, BaseIdentifier {
  generateAuthToken(
    notificationToken: PushSubscription | string
  ): Promise<string>;
  forgotOtp?: number;
}

var tokenSchema = new mongoose.Schema(
  {
    token: {
      type: String,
    },
  },
  { _id: false }
);

var ArtistSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      min: 10,
      trim: true,
      alias: "number",
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    showDetails: { type: Boolean, required: false },
    password: {
      type: String,
      min: 8,
      trim: true,
      validate(value: string) {
        if (value.toLowerCase().includes("password")) {
          throw new Error("password cannot contain password");
        }
      },
      required: true,
    },
    tokens: [tokenSchema],

    code: {
      type: Number,
      required: function (): Boolean {
        //@ts-ignore
        return this.method == LoginType.Number;
      },
    },

    forgotOtp: { type: Number },
    codeValid: {
      type: Boolean,
      required: function (): Boolean {
        //@ts-ignore
        return this.method == LoginType.Number;
      },
    },
  },
  {
    timestamps: true,
    _id: false,
  }
);

ArtistSchema.index(
  { createdAt: 1 },
  { expireAfterSeconds: 300, partialFilterExpression: { codeValid: true } }
);

ArtistSchema.methods.toJSON = function () {
  const artist = this as ArtistDocument;
  const artistObject = artist.toObject() as any;

  delete artistObject.password;
  delete artistObject.tokens;

  return artistObject;
};

const Artist = mongoose.model<ArtistDocument>("Artist", ArtistSchema);
export default Artist;
