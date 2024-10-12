"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.privateRequest = void 0;
const privateRequest = (req, res, next) => {
    if (req.headers.authorization) {
        let authorizationToken = req.headers.authorization.split(' ')[1];
        if (authorizationToken === 'todoToken') {
            return next();
        }
    }
    return res.status(401).json({ error: "Precisa de acesso!" });
};
exports.privateRequest = privateRequest;
