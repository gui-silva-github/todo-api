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
exports.jwtStrategyAuth = exports.jwtStrategy = void 0;
const passport_jwt_1 = require("passport-jwt");
const dotenv_1 = __importDefault(require("dotenv"));
const user_1 = require("../services/user");
const passport_1 = __importDefault(require("passport"));
dotenv_1.default.config();
const options = {
    jwtFromRequest: passport_jwt_1.ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_KEY
};
exports.jwtStrategy = new passport_jwt_1.Strategy(options, (payload, done) => __awaiter(void 0, void 0, void 0, function* () {
    const { name } = payload;
    const user = yield (0, user_1.findUserByName)(name);
    if (user) {
        return done(null, user);
    }
    else {
        return done(null, false);
    }
}));
const jwtStrategyAuth = (req, res, next) => {
    const authRequest = passport_1.default.authenticate('jwt', (err, user) => {
        if (user) {
            req.user = user;
            return next();
        }
        return res.status(401).json({ error: "Acesso negado!" });
    });
    authRequest(req, res, next);
};
exports.jwtStrategyAuth = jwtStrategyAuth;
