"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removeLikeHandler = exports.addLikeHandler = exports.getInitialUnAuthDataHandler = exports.getInitialAuthDataHandler = exports.addPostHandler = void 0;
var axios_1 = __importDefault(require("axios"));
var checkErrors_1 = __importDefault(require("../helpers/checkErrors"));
var customError_1 = __importDefault(require("../helpers/customError"));
var localityName_1 = __importDefault(require("../helpers/localityName"));
var like_1 = require("../services/like");
var post_1 = require("../services/post");
function addPostHandler(req, res) {
    var _a;
    return __awaiter(this, void 0, void 0, function () {
        var post, point, locality, _b, err_1;
        return __generator(this, function (_c) {
            switch (_c.label) {
                case 0:
                    _c.trys.push([0, 6, , 7]);
                    post = void 0;
                    if (!req.body.point) return [3 /*break*/, 3];
                    point = req.body.point;
                    _b = localityName_1.default;
                    return [4 /*yield*/, axios_1.default.get(process.env.GOOGLELOCALITYURI + "&latlng=" + point.latitude + "," + point.longitude)];
                case 1:
                    locality = _b.apply(void 0, [_c.sent()]);
                    return [4 /*yield*/, post_1.createPost(__assign(__assign({}, req.body), { 
                            // city: mainCity.parentId ? mainCity.parentId : mainCity._id,
                            state: locality, ownerId: req.number, ownerName: req.user.username, location: {
                                type: "Point",
                                coordinates: [point.longitude, point.latitude],
                            } }))];
                case 2:
                    post = _c.sent();
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, post_1.createPost(__assign(__assign({}, req.body), { ownerId: req.number, ownerName: req.user.username }))];
                case 4:
                    post = _c.sent();
                    _c.label = 5;
                case 5:
                    res.send({
                        _id: (_a = post === null || post === void 0 ? void 0 : post._id) !== null && _a !== void 0 ? _a : "",
                    });
                    return [3 /*break*/, 7];
                case 6:
                    err_1 = _c.sent();
                    checkErrors_1.default(err_1, res);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.addPostHandler = addPostHandler;
function getInitialAuthDataHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var posts, props, position, _a, err_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    posts = void 0;
                    props = [
                        {
                            $lookup: {
                                from: "likes",
                                let: { postId: "$_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [{ $eq: ["$postId", "$$postId"] }],
                                            },
                                        },
                                    },
                                    { $project: { _id: 1, artistId: 1 } },
                                ],
                                as: "likes",
                            },
                        },
                        {
                            $addFields: {
                                liked: {
                                    $cond: {
                                        if: {
                                            $gt: [
                                                {
                                                    $size: {
                                                        $setIntersection: ["$likes.artistId", [req.number]],
                                                    },
                                                },
                                                0,
                                            ],
                                        },
                                        then: true,
                                        else: false,
                                    },
                                },
                            },
                        },
                        { $addFields: { count: { $size: "$likes" } } },
                        {
                            $project: {
                                createdAt: 1,
                                state: 1,
                                distance: 1,
                                ownerName: 1,
                                ownerId: 1,
                                imageUri: 1,
                                caption: 1,
                                count: 1,
                                liked: 1,
                            },
                        },
                    ];
                    if (!req.body.position) return [3 /*break*/, 3];
                    position = req.body.position;
                    return [4 /*yield*/, post_1.aggregatePost(__spreadArrays([
                            {
                                $geoNear: {
                                    near: {
                                        type: "Point",
                                        coordinates: [position.longitude, position.latitude],
                                    },
                                    distanceField: "distance",
                                    query: { location: { $exists: true } },
                                    key: "location",
                                    spherical: true,
                                },
                            }
                        ], props, [
                            { $sort: { distance: 1 } },
                        ]))];
                case 1:
                    _a = [(_b.sent())];
                    return [4 /*yield*/, post_1.aggregatePost(__spreadArrays([
                            { $match: { location: { $exists: false } } }
                        ], props, [
                            { $sort: { createdAt: -1 } },
                        ]))];
                case 2:
                    posts = __spreadArrays.apply(void 0, _a.concat([(_b.sent())]));
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, post_1.aggregatePost(__spreadArrays(props))];
                case 4:
                    posts = _b.sent();
                    _b.label = 5;
                case 5:
                    res.send(posts);
                    return [3 /*break*/, 7];
                case 6:
                    err_2 = _b.sent();
                    checkErrors_1.default(err_2, res);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getInitialAuthDataHandler = getInitialAuthDataHandler;
function getInitialUnAuthDataHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var posts, props, position, _a, err_3;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    _b.trys.push([0, 6, , 7]);
                    posts = void 0;
                    props = [
                        {
                            $lookup: {
                                from: "likes",
                                let: { postId: "$_id" },
                                pipeline: [
                                    {
                                        $match: {
                                            $expr: {
                                                $and: [{ $eq: ["$postId", "$$postId"] }],
                                            },
                                        },
                                    },
                                    { $project: { _id: 1, artistId: 1 } },
                                ],
                                as: "likes",
                            },
                        },
                        { $addFields: { count: { $size: "$likes" } } },
                        {
                            $project: {
                                createdAt: 1,
                                state: 1,
                                distance: 1,
                                ownerName: 1,
                                ownerId: 1,
                                imageUri: 1,
                                caption: 1,
                                count: 1,
                            },
                        },
                    ];
                    if (!req.body.position) return [3 /*break*/, 3];
                    position = req.body.position;
                    return [4 /*yield*/, post_1.aggregatePost(__spreadArrays([
                            {
                                $geoNear: {
                                    near: {
                                        type: "Point",
                                        coordinates: [position.longitude, position.latitude],
                                    },
                                    distanceField: "distance",
                                    query: { location: { $exists: true } },
                                    key: "location",
                                    spherical: true,
                                },
                            }
                        ], props, [
                            { $sort: { distance: 1 } },
                        ]))];
                case 1:
                    _a = [(_b.sent())];
                    return [4 /*yield*/, post_1.aggregatePost(__spreadArrays([
                            { $match: { location: { $exists: false } } }
                        ], props, [
                            { $sort: { createdAt: -1 } },
                        ]))];
                case 2:
                    posts = __spreadArrays.apply(void 0, _a.concat([(_b.sent())]));
                    return [3 /*break*/, 5];
                case 3: return [4 /*yield*/, post_1.aggregatePost(__spreadArrays(props))];
                case 4:
                    posts = _b.sent();
                    _b.label = 5;
                case 5:
                    res.send(posts);
                    return [3 /*break*/, 7];
                case 6:
                    err_3 = _b.sent();
                    checkErrors_1.default(err_3, res);
                    return [3 /*break*/, 7];
                case 7: return [2 /*return*/];
            }
        });
    });
}
exports.getInitialUnAuthDataHandler = getInitialUnAuthDataHandler;
function addLikeHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var post, err_4;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, post_1.findPost({ _id: req.params.postId })];
                case 1:
                    post = _a.sent();
                    if (!post) {
                        throw new customError_1.default("Bad Request", 404, "No Such Post Found");
                    }
                    return [4 /*yield*/, like_1.createLike({
                            postId: req.params.postId,
                            ownerId: post.ownerId,
                            artistName: req.user.username,
                            artistId: req.number,
                        })];
                case 2:
                    _a.sent();
                    res.send({ message: "Like Added" });
                    return [3 /*break*/, 4];
                case 3:
                    err_4 = _a.sent();
                    checkErrors_1.default(err_4, res);
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
exports.addLikeHandler = addLikeHandler;
function removeLikeHandler(req, res) {
    return __awaiter(this, void 0, void 0, function () {
        var err_5;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, like_1.findAndDeleteLike({
                            postId: req.params.postId,
                            artistId: req.number,
                        })];
                case 1:
                    _a.sent();
                    res.send({ message: "Post Deleted" });
                    return [3 /*break*/, 3];
                case 2:
                    err_5 = _a.sent();
                    checkErrors_1.default(err_5, res);
                    return [3 /*break*/, 3];
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.removeLikeHandler = removeLikeHandler;
