"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const api_1 = __importDefault(require("./routes/api"));
const passport_1 = __importDefault(require("passport"));
const passport_local_1 = require("./libs/passport-local");
const passport_bearer_1 = require("./libs/passport-bearer");
const passport_jwt_1 = require("./libs/passport-jwt");
const passport_local_jwt_1 = require("./libs/passport-local-jwt");
dotenv_1.default.config();
const server = (0, express_1.default)();
server.use((0, cors_1.default)());
server.use(express_1.default.static(path_1.default.join(__dirname, '../public')));
server.use(express_1.default.urlencoded({ extended: true }));
server.use(express_1.default.json());
passport_1.default.use(passport_local_1.localStrategy);
passport_1.default.use('local-jwt', passport_local_jwt_1.localStrategyJWT);
passport_1.default.use(passport_bearer_1.bearerStrategy);
passport_1.default.use(passport_jwt_1.jwtStrategy);
server.use(passport_1.default.initialize());
server.get('/ping', (req, res) => res.json({ pong: true }));
server.use(api_1.default);
server.use((req, res) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});
server.listen(process.env.PORT, () => {
    console.log(`Aplicação rodando nesta url: http://localhost:${process.env.PORT}/todo`);
});
