import { axiosPrivate } from '../../../app/api/axios.js'
import { createAsyncThunk } from "@reduxjs/toolkit";
import { signOut, AuthErrorCodes } from "firebase/auth";
import { auth } from '../../../auth/firebaseInit.js'

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

export const userSignOut = createAsyncThunk(
    'user/userSignOut',
    async () => {
        try {
            await signOut(auth);
            axiosPrivate.delete('/users/logout')
        } catch (error) {
            throw new Error(handleErrors(error));
        }
    }
)

