import initializeFirebaseAuth from "./auth/firebaseApp.js";
import express from "express";
import cookieParser from "cookie-parser";
import morgran from 'morgan'
import { dbConnect } from './config/dbConnect.js'
import { PORT, COOKIE_SECRET } from "./config/env.js";
import {
    errorHandler,
    credentials,
    missingRoutes,
    handleCors,
    ignoreFavicon,
    csrfMiddleWare
} from "./middleware/middleware.js";
import routes from "./routes/index.js";

initializeFirebaseAuth()
const app = express();
// app.use(initializeFirebaseAuth)
app.use(morgran('tiny'))
app.use(ignoreFavicon);
app.use(credentials);
app.use(handleCors());
app.use(express.json());
app.use(cookieParser(COOKIE_SECRET))
app.use(csrfMiddleWare)
routes(app)

app.use(missingRoutes);
app.use(errorHandler);
dbConnect((connection) => {
    if (connection instanceof Error) {
        console.log('Error connecting to mongoDB : ', connection.message);
        process.exit(1)
    } else {
        connection.once('open', () => {
            console.log("\x1b[33m%s\x1b[0m", "mongoDB successfully connected");
        });
        app.listen(PORT, () => {
            console.log("\x1b[34m%s\x1b[0m", `ExpressJS is listening on port ${PORT}`);
        });
    }
});
