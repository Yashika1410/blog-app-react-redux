import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBlog, loadBlogs } from "../app/actions";

function AddPost() {
     const dispatch = useDispatch();
     const navigate = useNavigate();
     const [user, setUser] = useState({});

    useEffect(() => {
        dispatch(loadBlogs());
    }, []);

    const { blogs } = useSelector((state) => state.blogs);
    useEffect(() => {
        let user = sessionStorage.getItem("user");
        if (user) {
            setUser({ ...JSON.parse(user) });
        } else {
            navigate("/login");
        }
    }, []);

    const [blog, setBlog] = useState({
        id: 0,
        title: "",
        desc: "",
        likecnt:0,
        author: user.username
    });
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        // console.log(name,value)
        setBlog({ ...blog, [name]: value, id: blogs.length + 1 });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (blog.title.length === 0 || blog.desc.length === 0) {
            setError("Please fill in all the fields.");
        } else {
            dispatch(
                addBlog({
                    id: blogs.length + 1,
                    title: blog.title,
                    desc: blog.desc,
                    likecnt:0,
                    author: user.username
                })
            );
            setError("");
            alert("Successfully Added")
            navigate("/");
        }
    };

  return (
     <div className="container" style={{  maxWidth:'50%' ,margin: 'auto', marginTop:'100px' }}>
        
          <form onSubmit={handleSubmit}>
                <h3>Add Blog</h3>
                <div className="form-group">
                    <label>Title</label>
                  <input type="text" name="title" className="form-control" placeholder="Enter Title" value={blog.title}
                      onChange={handleInputChange} required/>
                </div>
                <div className="form-group">
                    <label>Description</label>
                  <textarea type="text" name="desc" style={{ height: "250px" }} className="form-control" placeholder="Enter description" value={blog.desc}
                      onChange={handleInputChange} required/>
                </div>
                <br/>
                <button type="submit" className="btn btn-primary btn-block" >Submit</button>
               
            </form>
            </div>
  )
}
export default AddPost;