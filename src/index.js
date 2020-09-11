import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux"
import App from "./components/App";
import {store} from "./store";
import {ClientContext} from "./components/Contexts";
import Client from "./api/v3/Client";

// const serverHost = "https://hyzhc0j439.execute-api.ap-northeast-1.amazonaws.com/development";
const serverHost = "http://localhost:8080";
ReactDOM.render(
    <Provider store={store}>
        <ClientContext.Provider value={new Client(serverHost)}>
            <App />
        </ClientContext.Provider>
    </Provider>,
    document.getElementById('root')
);
