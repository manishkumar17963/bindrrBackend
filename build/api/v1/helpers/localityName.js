"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var customError_1 = __importDefault(require("./customError"));
var LocalityName = function (value) {
    var _a;
    var body = value.data;
    var addressComponents = body.status == "OK"
        ? body.results[0].address_components
        : [];
    if (addressComponents == []) {
        throw new customError_1.default("Bad request", 404, "No such latlng pair found");
    }
    console.log(addressComponents);
    var locality = addressComponents.find(function (address) {
        return address.types.some(function (type) { return type == "administrative_area_level_1"; });
    });
    // if (!locality) {
    //   throw new CustomError("Bad request", 404, "No locality found");
    // }
    console.log(locality);
    return (_a = locality === null || locality === void 0 ? void 0 : locality.long_name) !== null && _a !== void 0 ? _a : "";
};
exports.default = LocalityName;
