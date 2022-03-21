"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var artist_1 = require("../controller/artist");
var auth_1 = __importDefault(require("../middleware/auth"));
var artist_2 = __importDefault(require("../model/artist"));
var ArtistRouter = express_1.default.Router();
ArtistRouter.post("/add/post", auth_1.default(artist_2.default), artist_1.addPostHandler);
ArtistRouter.post("/initial/auth/data", auth_1.default(artist_2.default), artist_1.getInitialAuthDataHandler);
ArtistRouter.post("/initial/unauth/data", artist_1.getInitialUnAuthDataHandler);
ArtistRouter.post("/add/like/:postId", auth_1.default(artist_2.default), artist_1.addLikeHandler);
ArtistRouter.post("/remove/like/:postId", auth_1.default(artist_2.default), artist_1.removeLikeHandler);
exports.default = ArtistRouter;
