import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      return action.payload;
    },
    appendBlog(state, action) {
      state.push(action.payload);
    },
  },
});

export const { setBlogs, appendBlog } = blogSlice.actions;

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.createNew(content);
      dispatch(appendBlog(newBlog));
      return { success: true, blog: newBlog };
    } catch (error) {
      return {
        success: false,
        error:
          error?.response?.data?.error ||
          "An error occurred while adding the blog",
      };
    }
  };
};

export default blogSlice.reducer;
