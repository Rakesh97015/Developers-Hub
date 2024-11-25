import axios from 'axios';
import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import NavBar from '../NavBar.js';
import 'bootstrap/dist/css/bootstrap.min.css';

function Login() {
    const navigate = useNavigate();

    const [data, setData] = useState({
        email: "",
        password: ""
    });

    const onChangeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const onSuccess = (token) => {
        Cookies.set('Jwt_Token', token, { expires: 100 });
        navigate("/dashboard");
    };

    const onSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:5000/login', data)
            .then((res) => {
                onSuccess(res.data.token)
            })
            .catch((err) => {
                alert(err);
            });
    };

    return (
        <>
            <NavBar/>
            <div className="d-flex justify-content-center align-items-center min-vh-100 bg-success overflow-hidden">
                <form onSubmit={onSubmit}>
                    <h1 className="text-center mb-4">Sign In</h1>
                    <h6 className="text-center mb-4">Sign into Your Account</h6>

                    <div className="input-group mb-3">
                        <span className="input-group-text">Email</span>
                        <input 
                            type="text"
                            name="email"
                            className="form-control"
                            placeholder="Email"
                            aria-label="Email"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <div className="input-group mb-3">
                        <span className="input-group-text">Password</span>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            placeholder="Password"
                            aria-label="Password"
                            onChange={onChangeHandler}
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    <h6 className="mt-3">Don't have an account? <a href="/register" className="text-light">Register here</a></h6>
                </form>
            </div>
        </>
    );
}

export default Login;

