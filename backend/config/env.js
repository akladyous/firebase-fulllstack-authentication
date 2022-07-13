import dotenv from 'dotenv';
dotenv.config();

const cookieTimeout = 15 * 60 * 1000 // 1 * 24 * 60 * 60 * 1000;
const sessionCookie = 60 * 60 * 24 * 1 * 1000
export const {
    DATABASE_URI = process.env.DATABASE_URI,
    PORT = process.env.PORT,
    COOKIE_SECRET = process.env.SECRET,
    COOKIE_TIMEOUT = cookieTimeout,
    SESSION_COOKIE = sessionCookie,
} = process.env;


// require('crypto').randomBytes(64).toString('hex')
