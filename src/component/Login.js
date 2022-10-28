import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { loadUsers } from '../app/actions';
import { useSelector, useDispatch } from "react-redux";

function Login() {
    let dispatch = useDispatch();
    const navigate = useNavigate();
    const { users, loading } = useSelector((state) => state.users);
    const [formInput, setFormInput] = useState({
        email: "",
        password: "",
    });
    const [error, setError] = useState("");
    //get all users
    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    useEffect(() => {
        let user = sessionStorage.getItem("user");
        if (user) {
            navigate("/");
        }
    }, []);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setFormInput({ ...formInput, [name]: value });
    };

    const handleLogin = (e) => {
        let shouldLogin = false;
        e.preventDefault();
        if (formInput.email === "" || formInput.password === "") {
            alert("Please fill both fields");
            
        } else {
            users.forEach((element) => {
                if (
                    element.email === formInput.email &&
                    element.password === formInput.password
                ) {
                    shouldLogin = true;
                    sessionStorage.setItem("user", JSON.stringify(element));
                    navigate("/");
                }
            });
            setError("");
            if (shouldLogin === false) {
                alert("Invalid Credentials");
            }
        }
    };
   
    return (
        <div className="container" style={{ maxWidth: '50%', margin: 'auto', marginTop: '100px' }}>

            <form onSubmit={handleLogin}>
                <h3>Log In</h3>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type ="password" name='password' className="form-control" placeholder="Enter password" onChange={handleInputChange}  required />
                </div>
                <br/>
                <button type="submit" className="btn btn-primary btn-block">Submit</button>
                {error}
            </form>
        </div>);
}
export default Login;