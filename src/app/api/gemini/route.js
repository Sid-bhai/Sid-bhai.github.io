"use strict";
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
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GET = void 0;
var server_1 = require("next/server");
var generative_ai_1 = require("@google/generative-ai");
var axios = require("axios");
function GET(request) {
    return __awaiter(this, void 0, void 0, function () {
        // Converts file information (local path or URL) to a GoogleGenerativeAI.Part object.
        function fileToGenerativePart(fileInfo) {
            return __awaiter(this, void 0, void 0, function () {
                var response, data;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!(fileInfo.type === "local")) return [3 /*break*/, 1];
                            return [2 /*return*/, {
                                    inlineData: {
                                        data: Buffer.from(fs.readFileSync(fileInfo.path)).toString("base64"),
                                        mimeType: fileInfo.mimeType,
                                    },
                                }];
                        case 1:
                            if (!(fileInfo.type === "url")) return [3 /*break*/, 3];
                            return [4 /*yield*/, axios.get(fileInfo.url, { responseType: "arraybuffer" })];
                        case 2:
                            response = _a.sent();
                            data = Buffer.from(response.data, "binary").toString("base64");
                            return [2 /*return*/, {
                                    inlineData: {
                                        data: data,
                                        mimeType: fileInfo.mimeType,
                                    },
                                }];
                        case 3: throw new Error("Invalid file information type.");
                    }
                });
            });
        }
        var searchParams, query, imageUrl, type, API_KEY, genAI, model, prompt, imageFiles, imageParts, result, res, response, genAI, model, prompt, result, res, response, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    searchParams = new URL(request.url).searchParams;
                    query = searchParams.get('query');
                    imageUrl = searchParams.get('img');
                    type = searchParams.get('type');
                    API_KEY = 'AIzaSyCdf0QI11bfqok5uX1UXuTvonUkeOF8ooM';
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 9, , 10]);
                    if (!imageUrl) return [3 /*break*/, 5];
                    genAI = new generative_ai_1.GoogleGenerativeAI(API_KEY);
                    model = genAI.getGenerativeModel({ model: "gemini-pro-vision" });
                    prompt = query || 'Explain This image';
                    imageFiles = [
                        { type: type || "url", url: imageUrl, mimeType: "image/png" },
                    ];
                    return [4 /*yield*/, Promise.all(imageFiles.map(fileToGenerativePart))];
                case 2:
                    imageParts = _a.sent();
                    return [4 /*yield*/, model.generateContent(__spreadArray([prompt], imageParts, true))];
                case 3:
                    result = _a.sent();
                    return [4 /*yield*/, result.response];
                case 4:
                    res = _a.sent();
                    response = res.text();
                    return [2 /*return*/, server_1.NextResponse.json({ response: response }, { status: 500 })];
                case 5:
                    genAI = new generative_ai_1.GoogleGenerativeAI(API_KEY);
                    model = genAI.getGenerativeModel({ model: "gemini-pro" });
                    prompt = query;
                    return [4 /*yield*/, model.generateContent(prompt)];
                case 6:
                    result = _a.sent();
                    return [4 /*yield*/, result.response];
                case 7:
                    res = _a.sent();
                    response = res.text();
                    return [2 /*return*/, server_1.NextResponse.json({ response: response }, { status: 500 })];
                case 8: return [3 /*break*/, 10];
                case 9:
                    error_1 = _a.sent();
                    console.error(error_1.message);
                    return [2 /*return*/, server_1.NextResponse.json({ error: error_1.message }, { status: 500 })];
                case 10: return [2 /*return*/];
            }
        });
    });
}
exports.GET = GET;
