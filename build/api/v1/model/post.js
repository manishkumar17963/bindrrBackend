"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _this = this;
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var common_1 = require("./common");
var PostSchema = new mongoose_1.default.Schema({
    caption: {
        type: String,
        required: function () {
            //@ts-ignore
            !_this.owner;
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
    location: common_1.PointSchema,
    imageUri: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
PostSchema.index({
    location: "2dsphere",
});
var Post = mongoose_1.default.model("Post", PostSchema);
exports.default = Post;
