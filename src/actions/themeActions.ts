/**
 * @param {Object} client
 * @returns {{payload: Promise, type: string}}
 */
import {
    FETCH_THEME,
    FETCH_THEME_FULFILLED,
    FETCH_THEME_PENDING,
    FETCH_THEME_REJECTED
} from "../actionTypes";
import Client from "../api/v3/Client";
import Collection from "../types/Collection";
import Seiheki from "../types/Seiheki";

export interface FetchThemePendingAction {
    type: typeof FETCH_THEME_PENDING
    payload: Collection<Seiheki>
}

export interface FetchThemeFulfilledAction {
    type: typeof FETCH_THEME_FULFILLED
    payload: Collection<Seiheki>
}

export interface FetchThemeRejectedAction {
    type: typeof FETCH_THEME_REJECTED
    payload: Collection<Seiheki>
}

export function fetchTheme(client: Client) {
    return {
        type: FETCH_THEME,
        payload: client.getCards(1)
    };
}
