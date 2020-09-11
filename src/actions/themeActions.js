/**
 * @param {Object} client
 * @returns {{payload: Promise, type: string}}
 */
import {FETCH_THEME} from "../actionTypes";

export function fetchTheme(client) {
    return {
        type: FETCH_THEME,
        payload: client.getCards(1)
    };
}
