import { configureStore } from "@reduxjs/toolkit";
import blogsReducer from "../features/blogsSlice";

export const store = configureStore({
    reducer: {
       blogs: blogsReducer, 
    }
});
