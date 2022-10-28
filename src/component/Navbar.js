import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Navbar, Container, Nav } from 'react-bootstrap'

function NavigationBar() {
    const navigate = useNavigate()
    let user = sessionStorage.getItem("user");
    const logoutUser = (e) => {
        e.preventDefault()
        sessionStorage.clear();
        navigate('/')
    }
    const home = (e) => {
        navigate('/')
    }
    return (

        <Navbar bg="light" variant="light" fixed="top" >
            <Container>
                <Navbar.Brand href='/' >Blog App</Navbar.Brand>

                {user !== null ? <div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Navbar.Text>
                                Signed in as: {JSON.parse(user).username}
                            </Navbar.Text>
                        </Nav>
                        <button className='btn btn-primary' style={{ borderRadius: "20px", minWidth: "100px", margin: "0px 10px 0px 10px" }} onClick={(e) => { navigate("/addpost") }}>Add Blog</button>
                        <button className='btn btn-warning' style={{ borderRadius: "20px", minWidth: "100px", margin: "0px 10px 0px 10px" }} onClick={(e) => { logoutUser(e) }}>Logout</button>
                    </Navbar.Collapse>
                </div> : <div>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <button className='btn btn-success' style={{ borderRadius: "20px", minWidth: "100px", margin: "0px 10px 0px 10px" }} onClick={(e) => navigate("/login")}>Log In</button>
                        <button className='btn btn-secondary' style={{ borderRadius: "20px", minWidth: "100px", margin: "0px 10px 0px 10px" }} onClick={(e) => navigate("/signup")}>Signup</button>
                    </Navbar.Collapse>
                </div>}

            </Container>
        </Navbar >
    );
}
export default NavigationBar;