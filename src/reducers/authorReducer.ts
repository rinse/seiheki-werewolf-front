import {PUT_AUTHOR} from "../actionTypes";
import {AuthorAction} from "../actions/authorActions";

export default function authorReducer(author = "", action: AuthorAction) {
    switch (action.type) {
        case PUT_AUTHOR: {
            return action.payload;
        }
        default:
            break;
    }
    return author;
}