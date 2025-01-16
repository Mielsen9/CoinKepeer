import React from 'react';
import { createRoot } from 'react-dom/client';
import  "./scss/style.scss";
import {App} from "./App";
import {Provider} from "react-redux";
import {store} from "@/state/store";

const rootElement = document.getElementById('root');

if (!rootElement) {
    throw new Error('Root node not found');
}

const root = createRoot(rootElement);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>,
)




