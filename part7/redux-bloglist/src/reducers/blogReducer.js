import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    setBlogs(state, action) {
      console.log(state);
      console.log(action.payload);
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
    console.log(blogs);
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

export const likeBlog = (content) => {
  const id = content.id;
  const likedBlog = {
    ...content,
    likes: content.likes + 1,
  };
  return async (dispatch) => {
    const updatedBlog = await blogService.update(id, likedBlog);
    dispatch(updateBlog(updatedBlog));
  };
};

export const deleteBlog = (content) => {
  const id = content;
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
