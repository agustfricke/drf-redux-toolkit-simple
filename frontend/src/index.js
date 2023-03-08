import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'
import { store } from "./app/store";
import { Provider } from 'react-redux';
import { extendedApiSlice } from './features/postsSlice';

store.dispatch(extendedApiSlice.endpoints.getPosts.initiate());

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={store}>
        <App/>
    </Provider>
);

