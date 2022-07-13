import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from '../../../auth/firebaseInit.js'
import { signInWithEmailAndPassword, AuthErrorCodes } from "firebase/auth";

const handleErrors = (error) => {
    switch (error.code) {
        case AuthErrorCodes.INVALID_PASSWORD:
            return "invalid password";
        case AuthErrorCodes.INVALID_EMAIL:
            return "invalid email";
        case AuthErrorCodes.EMAIL_EXISTS:
            return "email already in use";
        case AuthErrorCodes.USER_DELETED:
            return "User not found";
        case AuthErrorCodes.USER_DISABLED:
            return "User Disabled";
        case AuthErrorCodes.USER_SIGNED_OUT:
            return "User signed out";
        default:
            return "authentication error";
    }
};

export const userLogin = createAsyncThunk(
    "user/userLogin",
    async (userData, thunkAPI) => {
        const { email, password, csrfToken } = userData;

        try {
            await signInWithEmailAndPassword(auth, email, password);
            const idToken = await auth.currentUser.getIdToken(true)

            var data = JSON.stringify({ idToken: idToken, _csrf: csrfToken });
            var config = {
                method: 'post',
                url: 'http://localhost:4000/api/users/login',
                withCredentials: true,
                headers: { 'Content-Type': 'application/json', 'XSRF-TOKEN': csrfToken, Authorization: `Bearer ${idToken}` },
                data: data
            };
            const response = await axios(config)
            return { ...response.data }
        } catch (error) {
            await auth.signOut(auth);
            thunkAPI.rejectWithValue(handleErrors(error))
        }
    }
);