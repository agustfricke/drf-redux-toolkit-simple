import { createSelector, createEntityAdapter } from "@reduxjs/toolkit";
import { add, sub } from "date-fns";
import { apiSlice } from "./apiSlice";

// ordenamos los posts por fecha
const postsAdapter = createEntityAdapter({
    sortComparer: ((a, b) => b.id - a.id)
});

// Creamos el initalState con el postsAdapter
const initialState = postsAdapter.getInitialState();

// Aqui vamos a llamar a la api con los diferente metodos HTTP

export const extendedApiSlice = apiSlice.injectEndpoints({
    endpoints: builder => ({
        getPosts: builder.query({
            query: () => '/posts/',
            // Usamos el transformResponse para agregar la fecha, reacciones y tambien para noramlizar los datos con el postsAdapter.setAll
            transformResponse: responseData => {
                const loadedPosts = responseData.map( post => {
                    return post
                })
                return postsAdapter.setAll(initialState, loadedPosts)
            },
            // Aqui estamos pondiendo el tag para refrescar el cache, para cuando hagamos una mutacion se puedan mostrar los nuevos datos, 
            // basicamente cuando llamamos a este tag las publicaciones se van a volver a refrescar
            providesTags: (result, error, arg) => [
                { type: 'Post', id: "LIST" },
                // aqui luego estamos poniendo un objecto para cada post individual pasando el id del post, y estamos haciendo esto mapieando el result
                // y lo estamos esparciendo en diferentes post ids y terinaos con esto de type post y id por cada post,
                // entonces si invalidamos alguno de estos post ids tambien se va a refrescar todos los posts.
                ...result.ids.map(id => ({ type: 'Post', id }))
            ]
        }),
        addNewPost: builder.mutation({
            query: initialPost => ({
                url: '/posts/',
                method: 'POST',
                body: { ...initialPost }
            }),
            invalidatesTags: [
                { type: 'Post', id: "LIST" }
            ]
        }),
        updatePost: builder.mutation({
            query: initialPost => ({
                url: `/posts/${initialPost.id}/`,
                method: 'PUT',
                body: { ...initialPost }
            }), 
            invalidatesTags: (result, error, arg) => [
                { type: 'Post',id: arg.id }
            ]
        }), 
        deletePost: builder.mutation({
            query: ({ id }) => ({
                url: `/posts/${id}/`,
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

// devuelve el resultado del query, pero es un objecto, nosostros queremos los datos entonces
export const selectPostsResult = extendedApiSlice.endpoints.getPosts.select();

// entonces nesitamos usar el createSelector para create este selectPostsData y si recuerdas el createSelector recibe
// una funcion input y despues tiene una funcion output entonces le pasamos el objecto query selectPostsResult como input
// y despues el output esta tomando ese resultado y esta agarrando los datos como vemos ahi postsResult.data y ese dats tiene
// ya los datos normalizados en el estado que tiene los ids y entites
const selectPostsData = createSelector(
    selectPostsResult,
    postsResult => postsResult.data
)

// Aqui agarramos el getSelectors donde crea los selectors y los renombramos con alias 
export const { 
    selectAll: selectAllPosts,
    selectById: selectPostById, 
    selectIds: selectPostIds 
    // Despues aqui pasamos el state y usamos el selectPostsData para decirle donde esta el estado y como vemos devuelve el estado normalizado
    // pero podria ser null sobre todo la primera vez que cargamos la aplicacion y usamos este operador nullish que basicamente si el selectPostsData
    // es null devuelve el initalState
} = postsAdapter.getSelectors(state => selectPostsData(state) ?? initialState) 









