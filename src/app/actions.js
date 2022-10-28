import * as types from "./actionTypes";

const getBlogs = (blogs) => ({
    type: types.GET_BLOGS,
    payload: blogs,
});
const blogDeleted = () => ({
    type: types.DELETE_BLOG,
});
const blogAdded = () => ({
    type: types.ADD_BLOG,
});
const getBlog = (blog) => ({
    type: types.GET_BLOG,
    payload: blog,
});
const blogUpdated = () => ({
    type: types.UPDATE_BLOG,
});
const getUsers = (users) => ({
    type: types.GET_USERS,
    payload: users,
});
const userAdded = () => ({
    type: types.ADD_USER,
});
const likeBlog = () =>({
    type: types.LIKE_BLOG,
});

export const loadBlogs = () => {
    return function (dispatch) {
        dispatch(getBlogs(JSON.parse(localStorage.getItem("reactBlogData"))["posts"]))
    };
};

export const deleteBlog = (id) => {
    return function (dispatch) {
        let main = JSON.parse(localStorage.getItem("reactBlogData"))
        let data = main["posts"]
        for (let i = 0; i < data.length; i++) {
            // console.log(data[i].id)
            if(data[i]!=null)
            if (data[i].id == id) {
                delete data[i];
                main["posts"] = data
                localStorage.setItem("reactBlogData", JSON.stringify(main))
                break
            }
        }
        dispatch(blogDeleted());
        dispatch(loadBlogs());
    };
};

export const addBlog = (blog) => {
    return function (dispatch) {
        let main = JSON.parse(localStorage.getItem("reactBlogData"))
        let data = main["posts"]
        data[data.length]=blog
        main["posts"]=data
        localStorage.setItem("reactBlogData", JSON.stringify(main))
        dispatch(blogAdded());
        dispatch(loadBlogs());
        
    };
};

export const getSingleBlog = (id) => {
    return function (dispatch) {
        let data=JSON.parse(localStorage.getItem("reactBlogData"))["posts"]
        let blogData=null
        for(let i=0;i<data.length;i++){
            // console.log(data[i].id)
            if (data[i] != null)
            if(data[i].id==id){
                blogData=data[i]
                break;
            }
        }
        dispatch(getBlog(blogData))
    };
};

export const updateBlog = (blog, id) => {
    return function (dispatch) {
        let main=JSON.parse(localStorage.getItem("reactBlogData"))
        let data = main["posts"]
        for (let i = 0; i < data.length; i++) {
            if (data[i] != null)
            if (data[i].id == id) {
                data[i]=blog
                main["posts"]=data
                localStorage.setItem("reactBlogData",JSON.stringify(main))
                break;
            }
        }
        dispatch(blogUpdated());
        dispatch(loadBlogs());
       
    };
};

export const loadUsers = () => {
    return function (dispatch) {
        dispatch(getUsers(JSON.parse(localStorage.getItem("reactBlogData"))["users"]))
        
    };
};

export const addUser = (user) => {
    return function (dispatch) {
        let main = JSON.parse(localStorage.getItem("reactBlogData"))
        let data = main["users"]
        data[data.length] = user
        main["users"] = data
        localStorage.setItem("reactBlogData", JSON.stringify(main))
        dispatch(userAdded());
        dispatch(loadUsers());
    };
};
