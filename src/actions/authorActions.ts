import {PUT_AUTHOR} from "../actionTypes";

export interface PutAuthorAction {
    type: typeof PUT_AUTHOR
    payload: string
}

export type AuthorAction = PutAuthorAction

/**
 * @param {string} author
 * @returns {{payload: string, type: string}}
 */
export function putAuthor(author: string): PutAuthorAction {
    return {
        type: PUT_AUTHOR,
        payload: author
    };
}

