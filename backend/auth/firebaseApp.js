import { initializeApp, applicationDefault, getApps } from 'firebase-admin/app'
// const { default: serviceAccount } = await import('../service-account.json', { assert: { type: 'json' } });
// import serviceAccount from '../service-account.json' assert {type: 'json'};

const initializeFirebaseAuth = () => {
    initializeApp({ credential: applicationDefault() });
    if (getApps().length === 1) {
        console.log("\x1b[32m%s\x1b[0m", 'FireBase already initialized');
    } else {
        const error = new Error('error initalizing firebase account')
        error.status = 500
        error.stack = null
        throw error
    }
}
export default initializeFirebaseAuth;