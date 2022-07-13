import axios from "axios";
import { axiosPrivate } from "../api/axios.js";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from './firebaseInit.js'
import {
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
    AuthErrorCodes,
} from "firebase/auth";

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
    async (userData) => {
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
            return { ...response.data };
        } catch (error) {
            throw new Error(handleErrors(error));
        }
    }
);

export const userSignUp = createAsyncThunk(
    'user/userSignUp',
    async (userData, thunkAPI) => {
        const { email, password, csrfToken } = userData
        debugger
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            const idToken = await auth.currentUser.getIdToken(true)

            var data = JSON.stringify({ idToken: idToken, _csrf: csrfToken });
            var config = {
                method: 'post',
                url: 'http://localhost:4000/api/users/signup',
                withCredentials: true,
                headers: { 'Content-Type': 'application/json', 'XSRF-TOKEN': csrfToken, Authorization: `Bearer ${idToken}` },
                data: data
            };
            const response = await axios(config)
            thunkAPI.fulfillWithValue({ ...response.data })
        } catch (error) {
            thunkAPI.rejectWithValue(error)
        }
    }
)

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
