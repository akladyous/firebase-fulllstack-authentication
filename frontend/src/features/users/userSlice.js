import { createSlice, isPending, isRejected, isFulfilled, } from "@reduxjs/toolkit";
import { userLogin, userSignOut, userSignUp } from "../../app/thunkAPI/usersThunkAPI.jsx";

export const initialState = {
    isAuthenticated: false,
    user: null,
    status: "idle", // idle | loading | succeeded | failed
    error: "",
    message: "",
};

const isPendingAction = isPending(userLogin, userSignOut, userSignUp);
const isRejectedAction = isRejected(userLogin, userSignOut, userSignUp);
const isFulfilledAction = isFulfilled(userLogin, userSignOut, userSignUp);

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserStatus: (state, action) => {
            state.isAuthenticated = action.payload;
        },
        setUser: (state, action) => {
            state.user = { ...action.payload };
        },
        resetUser: (state) => {
            state.user = null;
        },
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        resetMessage: (state) => {
            state.message = "";
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        resetError: (state) => {
            state.error = "";
        },
        resetState: () => {
            return { ...initialState };
        },
    },
    extraReducers(builder) {
        builder
            .addCase(userLogin.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.message = "Login successfullt completed";
                state.user = { ...action.payload };
                state.status = "succeeded";
            })
            .addCase(userLogin.rejected, (state) => {
                state.isAuthenticated = false;
            })
            .addCase(userSignOut.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
                state.message = 'logout successfully completed'
            })
            .addCase(userSignUp.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.message = "Account successfully created";
                state.user = { ...action.payload };
            })
            .addMatcher(isPendingAction, (state) => {
                state.status = "loading";
            })
            .addMatcher(isFulfilledAction, (state) => {
                state.status = "succeeded";
                state.error = "";
            })
            .addMatcher(isRejectedAction, (state, action) => {
                state.status = "failed";
                state.error = action.error.message;
            });
    },
});
export const userState = (state) => state.user;
export const { setUserStatus, setUser, resetState, setMessage, setError } = userSlice.actions;
export default userSlice.reducer;
