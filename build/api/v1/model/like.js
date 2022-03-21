"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var LikeSchema = new mongoose_1.default.Schema({
    artistName: {
        type: String,
        required: true,
    },
    artistId: { type: String, required: true },
    ownerId: { type: String, required: true },
    postId: { type: mongoose_1.default.Schema.Types.ObjectId, required: true },
}, { timestamps: true });
var Like = mongoose_1.default.model("Like", LikeSchema);
exports.default = Like;
