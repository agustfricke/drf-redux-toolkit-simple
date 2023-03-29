import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { apiSlice } from "./apiSlice";

const postsAdapter = createEntityAdapter({
    sortComparer: ((a, b) => b.id - a.id)
});

const initialState = postsAdapter.getInitialState();

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/blogs/',
            transformResponse: responseData => {
                const loadedPosts = responseData.map( post => {
                    return post
                })
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            providesTags: (result, error, arg) => [
                { type: 'Post', id: "LIST" },
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/blogs/',
                method: 'POST',
                body: { ...initialPost }
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),
        updatePost: builder.mutation({
            query: initialPost => ({
                url: `/blogs/${initialPost.id}/`,
                method: 'PUT',
                body: { ...initialPost }
            }), 
            invalidatesTags: (result, error, arg) => [
                { type: 'Post',id: arg.id }
            ]
        }), 
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/blogs/${id}/`,
                method: 'DELETE',
                body: { id }
            }), 
            invalidatesTags: (result, error, arg) => [
                { type: 'Post', id: arg.id }
            ]
        })
    })
});

export const { 
    useUpdatePostMutation,
    useDeletePostMutation,
    useAddNewPostMutation,
    useGetPostsQuery, 
} = extendedApiSlice;

export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data
)

export const { 
    selectAll: selectAllPosts,
    selectById: selectPostById, 
    selectIds: selectPostIds 
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState) 









