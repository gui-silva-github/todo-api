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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bearerStrategyAuth = exports.bearerStrategy = void 0;
const passport_http_bearer_1 = require("passport-http-bearer");
const user_1 = require("../services/user");
const passport_1 = __importDefault(require("passport"));
exports.bearerStrategy = new passport_http_bearer_1.Strategy((token, done) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield (0, user_1.findUserByToken)(token);
    if (user) {
        return done(null, user);
    }
    else {
        return done(null, false);
    }
}));
const bearerStrategyAuth = (req, res, next) => {
    const authRequest = passport_1.default.authenticate('bearer', (err, user) => {
        if (user) {
            req.user = user;
            return next();
        }
        return res.status(401).json({ error: "Acesso negado!" });
    });
    authRequest(req, res, next);
};
exports.bearerStrategyAuth = bearerStrategyAuth;
