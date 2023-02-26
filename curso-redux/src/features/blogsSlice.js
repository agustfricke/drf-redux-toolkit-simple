import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const URL = 'http://127.0.0.1:8000/api/blogs'


const initialState = {
    blogs: [],
    status: 'idle', // idle, loading, success, fail
    error: null
}

export const fetchBlogs = createAsyncThunk('blogs/fetchBlogs', async () => {
    const response = await axios.get(`${URL}/`)
    return response.data
})

export const addNewBlog = createAsyncThunk('blogs/addNewBlog', async (initialBlog) => {
    const response = await axios.post(`${URL}/`, initialBlog)
    return response.data
})

export const updateBlog = createAsyncThunk('blogs/updateBlog', async (initialBlog) => {
    const { id } = initialBlog;
    try {
        const response = await axios.put(`${URL}/${id}/`, initialBlog)
        return response.data
    } catch (err) {
        return err.message;
    }
})

export const deleteBlog = createAsyncThunk('blogs/deleteBlog', async (initialBlog) => {
    const { id } = initialBlog;
    try {
        const response = await axios.delete(`${URL}/${id}/`,initialBlog)
        return response.data
    } catch (err) {
        return err.message
    }
})

const blogsSlice = createSlice({
    name: 'blogs',
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder
        .addCase(fetchBlogs.pending, (state, action) => {
            state.status = 'loading'
        })
        .addCase(fetchBlogs.fulfilled, (state, action) => {
            state.status = 'succeeded'
            state.blogs = state.blogs.concat(action.payload)
        })
        .addCase(fetchBlogs.rejected, (state, action) => {
            state.status = 'failed'
            state.error = action.error.message
        })
        .addCase(addNewBlog.fulfilled, (state, action) => {
            state.blogs.push(action.payload)
        })
        .addCase(updateBlog.fulfilled, (state, action) => {
            const { id } = action.payload;
            const blogs = state.blogs.filter(blog => blog.id !== id);
            state.blogs = [...blogs, action.payload];
        })
        .addCase(deleteBlog.fulfilled, (state, action) => {
            const { id } = action.payload;
            const blogs = state.blogs.filter(blog => blog.id !== id);
            state.blogs = blogs;
        })
    }
})

export const selectAllBlogs = (state) => state.blogs.blogs;
export const getBlogsStatus = (state) => state.blogs.status;
export const getBlogError = (state) => state.blogs.error;

export const selectBlogById = (state, blogId) => 
    state.blogs.blogs.find(blog => blog.id === blogId);

export default blogsSlice.reducer;





