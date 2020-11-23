/**
 * @param {Object} client
 * @returns {{payload: Promise, type: string}}
 */
import {FETCH_THEME} from "../actionTypes";
import Client from "../api/v3/Client";

export function fetchTheme(client: Client) {
    return {
        type: FETCH_THEME,
        payload: client.getCards(1)
    };
}
