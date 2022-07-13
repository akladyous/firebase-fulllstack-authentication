import { apiSlice } from './apiSlice.js'

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: build => ({
        login: build.mutation({
            query: ({ email, password, csrfToken }) => ({
                url: '/users/login',
                method: 'POST',
                body: { email, password, _csrf: csrfToken },
                headers: { 'XSRF-TOKEN': csrfToken }
            }),
            keepUnusedDataFor: 5
        }),
        logout: build.mutation({
            query: () => ({
                url: '/users/logout',
                method: "DELETE"
            }),
            keepUnusedDataFor: 5
        }),
        signup: build.mutation({
            query: (credentials) => ({
                url: '/users/signup',
                method: 'POST',
                body: { ...credentials }
            }),
            keepUnusedDataFor: 5
        }),
        updateUser: build.mutation({
            query: (id, credentials) => ({
                url: `users/update/${id}`,
                method: 'PATCH',
                body: { ...credentials }
            }),
            keepUnusedDataFor: 5
        }),
        deleteUser: build.mutation({
            query: (id) => ({
                url: `users/del/${id}`,
                method: 'DELETE',
            }),
            keepUnusedDataFor: 5
        }),
    })
});

export const {
    useLoginMutation,
    useLogoutMutation,
    useSignupMutation,
    useUpdateUserMutation,
    useDeleteUserMutation,
} = authApiSlice;