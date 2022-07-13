import { getAuth } from 'firebase-admin/auth';
import { SESSION_COOKIE } from '../../config/env.js'

export const loginController = async (req, res, next) => {
    const idToken = req.body?.idToken?.toString();
    const csrfToken = req.body?._csrf?.toString();

    if (!idToken) {
        return res.status(403).json({ error: "Authentication Error - missing idToken" })
    }
    if (csrfToken !== req.cookies['XSRF-TOKEN']) {
        return res.status(403).json({ error: "Authentication Error - invalid CSRF token" })
    };
    try {
        const decodedToken = await getAuth().verifyIdToken(idToken, true)

        if (Math.floor(new Date().getTime() / 1000) - decodedToken.auth_time < 5 * 60) {
            const expiresIn = SESSION_COOKIE;
            const sessionCookie = await getAuth().createSessionCookie(idToken, { expiresIn })
            const options = { maxAge: expiresIn, httpOnly: true, secure: true };
            res.cookie('session', sessionCookie, options)
            const currentUser = await getAuth().getUser(decodedToken.uid)

            return res.status(200).json({
                email: currentUser.email,
                emailVerified: currentUser.emailVerified,
                displayName: currentUser.displayName || null,
                photoURL: currentUser.photoURL || null,
                phoneNumber: currentUser.phoneNumber || null,
                lastSignInTime: decodedToken.auth_time || null,
            })


        } else {
            return res.status(401).json({ message: ' Recent sign in required!' });
        };
    } catch (error) {
        console.log("authController -> error : ", error)

        if (error.code == 'auth/id-token-revoked') {
            return res.status(403).json({ error: "Authentication Error - Token has been revoked" });
        } else if (error.code == 'app/invalid-credential') {
            return res.status(401).json({ error: "Authentication Error - Failed to determine project ID" })
        } else {
            return res.status(401).json({ error: "Authentication Error - missing authorization token" });
        }
    };
};