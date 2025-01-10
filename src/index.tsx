import React from 'react';
import { createRoot } from 'react-dom/client';
import  "./scss/style.scss";
import {App} from "./App";
// import {createBrowserRouter, RouterProvider} from "react-router-dom";
// import {Provider} from "react-redux";
// import {store} from "@/state/store";

const root = document.getElementById('root');

if (!root) {
    throw new Error('root nod found')
}

const container = createRoot(root)

// const router = createBrowserRouter([
//     {
//         path: "/",
//         element: <App />,
//     },
// ]);


container.render(<App />
    // <Provider store={store}>
    //     <RouterProvider router={router} />
    // </Provider>
);




