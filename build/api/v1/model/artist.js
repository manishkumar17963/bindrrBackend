"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var tokenSchema = new mongoose_1.default.Schema({
    token: {
        type: String,
    },
}, { _id: false });
var ArtistSchema = new mongoose_1.default.Schema({
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
        validate: function (value) {
            if (value.toLowerCase().includes("password")) {
                throw new Error("password cannot contain password");
            }
        },
        required: true,
    },
    tokens: [tokenSchema],
    code: {
        type: Number,
        required: function () {
            //@ts-ignore
            return this.method == LoginType.Number;
        },
    },
    forgotOtp: { type: Number },
    codeValid: {
        type: Boolean,
        required: function () {
            //@ts-ignore
            return this.method == LoginType.Number;
        },
    },
}, {
    timestamps: true,
    _id: false,
});
ArtistSchema.index({ createdAt: 1 }, { expireAfterSeconds: 300, partialFilterExpression: { codeValid: true } });
ArtistSchema.methods.toJSON = function () {
    var artist = this;
    var artistObject = artist.toObject();
    delete artistObject.password;
    delete artistObject.tokens;
    return artistObject;
};
var Artist = mongoose_1.default.model("Artist", ArtistSchema);
exports.default = Artist;
