import { allowedOrigins } from "../config/allowedOrigins.js";

export const credentials = (req, res, next) => {
    const origin = req.headers.origin = req.headers.origin || req.headers.host;
    if (allowedOrigins.includes(origin)) {
        res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
        res.setHeader("Access-Control-Allow-Credentials", true);
        res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, content-type, application/json");
        res.setHeader('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    };
    next();
};