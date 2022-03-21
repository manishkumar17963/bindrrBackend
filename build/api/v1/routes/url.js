"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var sendPresignedUrl_1 = require("../controller/sendPresignedUrl");
var auth_1 = __importDefault(require("../middleware/auth"));
var artist_1 = __importDefault(require("../model/artist"));
var UrlRouter = express_1.default.Router();
UrlRouter.put("/artist/presigned/url", auth_1.default(artist_1.default), sendPresignedUrl_1.sendPresignedUrlHandler);
exports.default = UrlRouter;
