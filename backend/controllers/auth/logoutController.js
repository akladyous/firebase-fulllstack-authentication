import { getAuth } from 'firebase-admin/auth';
import { SESSION_COOKIE } from '../../config/env.js'

export const logoutController = async (req, res, next) => {
    res.clearCookie('session');
    res.sendStatus(200);
};