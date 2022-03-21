"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var yup_1 = require("yup");
function checkError(err, res) {
    console.log(err);
    if (err instanceof mongoose_1.default.Error) {
        return res.status(400).send({
            errorType: "Bad credentials",
            message: err.message,
        });
    }
    if (err.name == "MongoError") {
        if (err.code == 11000) {
            return res.status(400).send({
                errorType: "Duplicate credientials",
                message: err.message,
            });
        }
        return res.status(400).send({
            errorType: "Duplicate credientials",
            message: err.message,
        });
    }
    if (err.code == 21614) {
        return res.status(400).send({
            errorType: "Wrong Number",
            message: "Not Seem to be Invalid",
        });
    }
    if (err instanceof yup_1.ValidationError) {
        return res.status(400).send({
            errorType: "Invalid Field",
            message: "Fields are Invalid",
        });
    }
    if (err.code == 21608) {
        return res.status(400).send({
            errorType: "Not verified",
            message: "Not verified Number ",
        });
    }
    if (err.name == "ClientError") {
        var castErr = err;
        return res.status(castErr.status).send({
            errorType: castErr.errorType,
            message: castErr.message,
        });
    }
    return res.status(500).send({
        errorType: "Bad request",
        message: "internal server error",
    });
}
exports.default = checkError;
module.exports = checkError;
