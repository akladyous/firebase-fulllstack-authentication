import mongoose from "mongoose";
import { DATABASE_URI } from "./env.js"
const mongooseOptions = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 3000,
}

export function dbConnect(cb) {
    const mongoDB = mongoose.connection;
    mongoose.connect(DATABASE_URI, mongooseOptions)
        .catch(error => {
            console.log('Error connecting to mongoDB : ', error.message);
            return cb(error)
        })
    mongoDB.on('error', () => {
        console.log('Error connecting to mongoDB')
        mongoose.disconnect();
    });
    mongoDB.on('disconnected', () => {
        console.info('mongoDB disconnected')
        mongoose.connect(DATABASE_URI, mongooseOptions)
    });
    mongoDB.on('reconnected', () => console.info('mongoDB reconnected'));
    return cb(mongoDB)
}
