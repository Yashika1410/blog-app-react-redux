import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useSelector, useDispatch } from "react-redux";
import { loadBlogs } from "../app/actions";
import { useNavigate } from 'react-router-dom';
function HomePage() {
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const { blogs } = useSelector((state) => state.blogs);
    const [user, setUser] = useState({});
    //get all blogs
    useEffect(() => {
        dispatch(loadBlogs());
    }, []);
    function getpage(id) {
        navigate(`/post/${id}`)
    }
    
    return (
        <div className="container" style={{ maxWidth: '75%', margin: 'auto', marginTop: '100px' }}>

            {
                blogs ?
                    blogs.map((item, i) => {
                        if(item!=null)
                        return <div style={{ marginBottom: '10px' }} key={item.id}>
                            
                            <Card>
                                <Card.Body>
                                    <Card.Title>{item.title}</Card.Title>
                                    <Card.Text>
                                        {item.desc.length>200?item.desc.slice(0, 220)+".....":item.desc}
                                    </Card.Text>
                                    <Button className="pull-right" variant="primary" onClick={(e) => getpage(item.id)}>Read More</Button>
                                </Card.Body>
                                <Card.Footer>
                                    <small  className="text-muted">By: {item.author}</small>
                                </Card.Footer>
                            </Card>

                        </div>
                    }) : <h1>No Post Found</h1>}
        </div>
    );
}
export default HomePage;