import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { auth } from '../../../auth/firebaseInit.js'
import { createUserWithEmailAndPassword } from "firebase/auth";


export const userSignUp = createAsyncThunk(
    'user/userSignUp',
    async (userData, thunkAPI) => {
        const { email, password, csrfToken } = userData
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
            return { ...response.data }
        } catch (error) {
            await auth.signOut(auth)
            thunkAPI.rejectWithValue(error)
        }
    }
)