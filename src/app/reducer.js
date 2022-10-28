import * as types from "./actionTypes";

const initialState = {
    blogs: [],
    blog: {},
    loading: true,
};

const initialUsersState = {
    users: [],
    loading: true,
};
export const usersReducer = (state = initialUsersState, action) => {
    switch (action.type) {
        case types.GET_USERS:
            return {
                ...state,
                users: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};

export const blogsReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.GET_BLOGS:
            return {
                ...state,
                blogs: action.payload,
                loading: false,
            };
        case types.DELETE_BLOG:
        case types.ADD_BLOG:
        case types.LIKE_BLOG:
        case types.UPDATE_BLOG:
            return {
                ...state,
                loading: false,
            };
        case types.GET_BLOG:
            return {
                ...state,
                blog: action.payload,
                loading: false,
            };
        default:
            return state;
    }
};
