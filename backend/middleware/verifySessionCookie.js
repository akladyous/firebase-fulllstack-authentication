import { getAuth } from 'firebase-admin/auth';

export async function verifySessionCookie(req, res, next) {
    const sessionCookie = req.cookies.session || '';
    // debugger
    try {
        // const decoded = await getAuth().verifySessionCookie(sessionCookie, true)
        // console.log("verifySessionCookie middleware -> decoded : ", decoded)
        await getAuth().verifySessionCookie(sessionCookie, true)
        next();
    } catch {
        const error = new Error('Session is unavailable or invalid. Please login')
        error.status = 403
        error.stack = null
        next(error)
    }
};