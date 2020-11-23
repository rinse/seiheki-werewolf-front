import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import App from "./components/App";
import {store} from "./store";
import {ClientContext} from "./components/Contexts";
import Client from "./api/v3/Client";

const serverHost = process.env.REACT_APP_SERVER_HOST || "";

ReactDOM.render(
    <Provider store={store}>
        <ClientContext.Provider value={new Client(serverHost)}>
            <App />
        </ClientContext.Provider>
    </Provider>,
    document.getElementById('root')
);
