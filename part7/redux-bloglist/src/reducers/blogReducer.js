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
    updateBlog(state, action) {
      return state.map((blog) =>
        blog.id !== action.payload.id ? blog : action.payload
      );
    },
    removeBlog(state, action) {
      return state.filter((blog) => blog.id !== action.payload);
    },
  },
});

export const { setBlogs, appendBlog, updateBlog, removeBlog } =
  blogSlice.actions;

export const fetchBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
  };
};

export const createBlog = (content) => {
  return async (dispatch) => {
    const newBlog = await blogService.createNew(content);
    dispatch(appendBlog(newBlog));
  };
};

export const likeBlog = (id, content) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, content);
    dispatch(updateBlog(updatedBlog));
  };
};

export const commentBlog = (id, content) => {
  return async (dispatch) => {
    const updatedBlog = await blogService.addComment(id, content);
    dispatch(updateBlog(updatedBlog));
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    try {
      await blogService.deleteOne(id);
      dispatch(removeBlog(id));
      return { success: true, id };
    } catch (error) {
      return {
        success: false,
        error:
          error?.response?.data?.error ||
          "An error occurred while deleting the blog",
      };
    }
  };
};
export default blogSlice.reducer;
