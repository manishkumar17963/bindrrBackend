"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPostSchema = void 0;
var yup_1 = require("yup");
exports.createPostSchema = yup_1.object({
    body: yup_1.object({
        caption: yup_1.string(),
        postUri: yup_1.string(),
    }),
});
