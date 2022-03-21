"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
function createEdgeNGrams(str) {
    if (str && str.length > 3) {
        var minGram_1 = 3;
        var maxGram_1 = str.length;
        return str
            .split(" ")
            .reduce(function (ngrams, token) {
            if (token.length > minGram_1) {
                for (var i = minGram_1; i <= maxGram_1 && i <= token.length; ++i) {
                    ngrams = __spreadArrays(ngrams, [token.substr(0, i)]);
                }
            }
            else {
                ngrams = __spreadArrays(ngrams, [token]);
            }
            return ngrams;
        }, [])
            .join(" ");
    }
    return str;
}
exports.default = createEdgeNGrams;
