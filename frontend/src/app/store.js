import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/apiSlice";

export const store = configureStore({
    reducer: {
        // Entonces vamos a tener el apiSlice que importamos y despues el reducer path que le 
        // habiamos puesto 'api', y despues el valor seria apiSlice.reducer
        [apiSlice.reducerPath]: apiSlice.reducer
    }, 
    // Como estamos usando redux toolkit query en el store tenemos que poner un middleware
    // Okey tenemos el middleware y despues el valor es getDefaultMiddleware que es el que usa
    // redux por defecto, y esto devuelve un arreglo y lo estamos conactenando con el apiSlice.middleware
    // que nesesitamos y que apiSlice crea.
    // Este middleware de la apiSlice maneja todo los que es el cache de nuestr aplicacion
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware().concat(apiSlice.middleware),
            devTools: true
})
