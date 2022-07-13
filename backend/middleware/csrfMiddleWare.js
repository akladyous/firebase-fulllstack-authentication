import csurf from 'csurf';
import { COOKIE_TIMEOUT } from '../config/env.js'

export const csrfMiddleWare = csurf({
    cookie: true,
    key: 'XSRF-TOKEN',
    path: '/',
    maxAge: COOKIE_TIMEOUT,
    httpOnly: true,
    sameSite: true,
    signed: true
});