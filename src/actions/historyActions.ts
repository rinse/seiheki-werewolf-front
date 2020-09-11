import {FETCH_HISTORY, FETCH_HISTORY_FULFILLED, FETCH_HISTORY_PENDING, FETCH_HISTORY_REJECTED} from "../actionTypes";
import Client from "../api/v3/Client";
import Collection from "../types/Collection";
import Seiheki from "../types/Seiheki";
import {FetchSeihekiFulFilledAction} from "./seihekiActions";

export interface FetchHistoryAction {
    type: typeof FETCH_HISTORY,
    payload: Promise<Collection<Seiheki>>
}

export interface FetchHistoryPendingAction {
    type: typeof FETCH_HISTORY_PENDING
}

export interface FetchHistoryFulfilledAction {
    type: typeof FETCH_HISTORY_FULFILLED,
    payload: Collection<Seiheki>
}

export interface FetchHistoryRejectedAction {
    type: typeof FETCH_HISTORY_REJECTED
}

export type HistoryAction
    = FetchHistoryAction
    | FetchHistoryPendingAction
    | FetchHistoryFulfilledAction
    | FetchHistoryRejectedAction
    | FetchSeihekiFulFilledAction

export function fetchHistory(client: Client): FetchHistoryAction {
    return {
        type: FETCH_HISTORY,
        payload: client.getHistories(100)
    };
}
