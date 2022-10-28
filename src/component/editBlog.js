import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getSingleBlog, updateBlog } from "../app/actions";
function EditPost() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const id  = useParams().id;
    const [user, setUser] = useState({});

    //get single blog
    useEffect(() => {
        dispatch(getSingleBlog(id));
    }, []);

    //get current blog
    useEffect(() => {
        let user = sessionStorage.getItem("user");
        if (user) {
            setUser({ ...JSON.parse(user) });
        } else {
            navigate("/login");
        }
    }, []);
    const { blog: targetBlog } = useSelector((state) => state.blogs);

    const [blog, setBlog] = useState({
        id: 0,
        title: "",
        desc: "",
        likecnt:0,
        author: user.username,
    });
    const [error, setError] = useState("");

    const handleInputChange = (e) => {
        let { name, value } = e.target;
        // console.log(name)
        setBlog({ ...blog, [name]: value, id: id });
    };

    useEffect(() => {
        if (targetBlog) {
            setBlog({ ...targetBlog });
        }
    }, [targetBlog]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (blog.title.length === 0 || blog.desc.length === 0) {
            setError("Please fill in all the fields.");
        } else {
            dispatch(
                updateBlog(
                    {
                        id: id,
                        title: blog.title,
                        desc: blog.desc,
                        likecnt:blog.likecnt,
                        author: user.username,
                    },
                    id
                )
            );
            setError("");
            alert("Successfully Updated")
            navigate(`/post/${id}`);
        }
    };
    // console.log(blog,user)
    return (
        <div className="container" style={{ maxWidth: '50%', margin: 'auto', marginTop: '100px' }}>

            <form onSubmit={handleSubmit}>
                <h3>Edit Blog</h3>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" className="form-control" placeholder="Enter Title" value={blog.title || ""}
                        onChange={handleInputChange}  />
                </div>
                <div className="form-group">
                    <label>Description</label>
                    <textarea type="text" name="desc" style={{ height: "250px" }} className="form-control" placeholder="Enter description" value={blog.desc || ""}
                        onChange={handleInputChange}  required />
                </div>
                <br />
                <button type="submit" className="btn btn-primary btn-block" >Update</button>
                {error}
            </form>
        </div>
    )
}

export default EditPost;