import { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import { userState } from "../features/users/userSlice.js";
import { userLogin } from "../app/thunkAPI/usersThunkAPI.jsx";

import { getCookie } from "../util/getCookie.js";
import { apiClient } from "../app/api/axios.js";

export default function UsersLogin() {
    const isMounted = useRef(true);
    const dispatch = useDispatch();
    const state = useSelector(userState);
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || "/";
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleForm = async (e) => {
        e.preventDefault();
        const csrfMeta = document.forms['login'].querySelector("meta[name='_csfr']")
        if (csrfMeta.content) {
            dispatch(userLogin({ email, password, csrfToken: csrfMeta.content }))
            if (state.isAuthenticated) {
                setTimeout(() => {
                    navigate(from, { replace: true })
                }, 2000);
            }
        } else {
            console.log('missing csrf meta data')
        }
    };


    useEffect(() => {
        if (isMounted.current) {
            apiClient.get('csrf')
                .then(() => {
                    const csrfToken = getCookie('XSRF-TOKEN')
                    const target = document.forms['login'].querySelector("meta[name='_csfr']")
                    target.content = csrfToken
                })
        }
        return () => isMounted.current = false
    }, [])

    return (
        <div className="container my-3">
            <div className="row justify-content-md-center">
                <div className="col col-lg-5 col-md-5 col-sm-5">
                    <div className="card">
                        <div className="card-header text-center">
                            SignIn Page
                        </div>
                        <div className="card-body">
                            <div className="d-flex align-items-center">
                                <img
                                    src={require("../assets/images/avatar.jpeg")}
                                    className="card-img-top mx-auto"
                                    alt="avatar"
                                    style={{ width: "25%", height: "25%" }}
                                />
                            </div>
                            <form onSubmit={handleForm} name="login">
                                <meta name="_csfr" content={null} />
                                <meta name="_csff_header" content="X-XSRF-TOKEN" />
                                <div className="mb-2">
                                    <label htmlFor="email" className="form-label">Email address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="form-control"
                                        placeholder=""
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div className="mb-2">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="form-control"
                                        placeholder=""
                                        value={password}
                                        onChange={(e) => { setPassword(e.target.value); }}
                                    />
                                </div>
                                <div className="mb-2">
                                    <p disabled className="text-center border-0 form-control" aria-describedby="response">
                                        {state.isAuthenticated ? "login successfully completed" : state.error}
                                    </p>
                                </div>
                                <div className="row justify-content-center">
                                    <div className="col col-auto">
                                        <button type="submit" className="btn btn-light" disabled={state.isAuthenticated}>
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
