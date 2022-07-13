import { configureStore } from "@reduxjs/toolkit";
import userReducer, { initialState } from "../features/users/userSlice.js"
// 
import { apiSlice } from '../app/api/apiSlice.js'

export const store = configureStore({
    reducer: {
        user: userReducer,
        // [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware({ serializableCheck: false })
        // .prepend(apiSlice.middleware),
    ],

    preloadedState: {

    }
});

store.subscribe(() => {
    // saveState(store.getState());
});