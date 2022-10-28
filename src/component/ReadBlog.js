import axios from 'axios'
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleBlog, updateBlog,deleteBlog } from '../app/actions';
function ReadPost() {
    const navigate = useNavigate();
    let dispatch = useDispatch();
    const id  = useParams().id;
    useEffect(() => {
        dispatch(getSingleBlog(id))
    }, []);
    let user = sessionStorage.getItem("user");
    const { blog: targetBlog } = useSelector((state) => state.blogs);
    const [blog, setBlog] = useState({
        id: 0,
        title: "",
        desc: "",
        likecnt: 0,
        author: "",
    });
    const [error, setError] = useState("");

    const handleDelete = (id) => {
        if (window.confirm("Are you sure ?")) {
            dispatch(deleteBlog(id));
            navigate("/")
        }
    };
   
    useEffect(() => {
        if (targetBlog) {
            setBlog({ ...targetBlog });
        }
    }, [targetBlog]);
    
    const editPost = (id) => {
        navigate(`/editpost/${id}`)
    }
    
    
    let addLike=(e)=>{
        e.preventDefault();
        setBlog({...blog,["likecnt"]:blog.likecnt+1,id:id})
        dispatch(updateBlog({
            id: id,
            title: blog.title,
            desc: blog.desc,
            likecnt: blog.likecnt+1,
            author: blog.author,
        },
            id
))
        setError("");
    }
    return (
        <div className="container" style={{ maxWidth: '75%', margin: 'auto', marginTop: '100px' }}>
            <div className="row">
                <div className="card" id="design">
                    <div className="card-body" >
                        <h1 className="card-title" id="centers" >{blog.title}</h1>
                        <p className="card-text">{blog.desc} </p>
                        <div className="text-muted" style={{ textAlign: "right" }}><p>Author : {blog.author}</p> {user !== null ?<form className="d-inline"> 
                        <input type="submit" name='likecnt'  className="btn btn-primary btn-sm" value={blog.likecnt + " Like"} onClick={addLike}></input>
                    
                        {JSON.parse(user)["username"]===blog.author?<input type="submit" style={{ margin: '5px' }} className="btn btn-warning btn-sm" value="Edit" onClick={(e) => {editPost(blog.id)}}></input>:""}
                        {JSON.parse(user)["username"] === blog.author ?<input type="submit" className="btn btn-danger btn-sm" value="Delete" onClick={(e) => { handleDelete(blog.id)}}></input>:""}
                        {error}
                        </form>  : ""} </div>
                    </div>

                </div>
            </div>
        </div>
    )
}
export default ReadPost;