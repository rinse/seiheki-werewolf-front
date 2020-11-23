import {combineReducers} from "redux";
import authorReducer from "./authorReducer";
import historyReducer from "./historyReducer";
import seihekisReducer from "./seihekisReducer";
import themeReducer from "./themeReducer";

export const rootReducer = combineReducers({
    author: authorReducer,
    history: historyReducer,
    seihekis: seihekisReducer,
    theme: themeReducer,
})

export type RootState = ReturnType<typeof rootReducer>
