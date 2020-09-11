import React from "react";
import Client from "../api/v3/Client"

export const ClientContext = React.createContext(new Client('http://localhost:8080'));
