import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { loadUsers,addUser } from "../app/actions";
function Signup() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [formInput, setFormInput] = useState({
        id: 0,
        username: "",
        email: "",
        password: "",
    });
    const [error, setError] = useState("");

    //load users to get the new user id
    useEffect(() => {
        dispatch(loadUsers());
    }, []);

    const { users, loading } = useSelector((state) => state.users);

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        setFormInput({ ...formInput, [name]: value, id: users.length + 1 });
    };
    const handleSignup = (e) => {
        e.preventDefault();
        if (formInput.email === "" || formInput.password === "") {
            alert("Please fill all the fields");
        } else {
            let userExits=null
            for(let i=0;i<users.length;i++){
                if(users[i].email==formInput.email){
                    userExits=users[i]
                    break
                }
            }
            // console.log(userExits)
            if (userExits==null) {
                dispatch(
                    addUser({
                        id: users.length + 1,
                        username: formInput.username,
                        email: formInput.email,
                        password: formInput.password,
                    })
                );
                sessionStorage.setItem("user", JSON.stringify(formInput));
                setError("");
                navigate("/");
            } else {
                alert("User Already Exists")
            }
        }
    };
    return (
        <div className="container" style={{ maxWidth: '50%', margin: 'auto', marginTop: '100px' }}>

            <form onSubmit={handleSignup}>
                <h3>Sign Up</h3>
                <div className="form-group">
                    <label>Username</label>
                    <input type="text" name="username" className="form-control" placeholder="Enter User Name" onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Email address</label>
                    <input type="email" name="email" className="form-control" placeholder="Enter email" onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                    <label>Password</label>
                    <input type="password" name="password" className="form-control" placeholder="Enter password" onChange={handleInputChange} required />
                </div>
                <button type="submit" className="btn btn-primary btn-block" >Submit</button>
                {error}
            </form>
        </div>);
}
export default Signup;