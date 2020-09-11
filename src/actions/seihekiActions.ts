import {
    FETCH_SEIHEKI,
    FETCH_SEIHEKI_FULFILLED,
    FETCH_SEIHEKIS,
    FETCH_SEIHEKIS_FULFILLED, FETCH_SEIHEKIS_PENDING, FETCH_SEIHEKIS_REJECTED
} from "../actionTypes";
import Client from "../api/v3/Client";
import Seiheki from "../types/Seiheki";
import Collection from "../types/Collection";

export interface FetchSeihekiAction {
    type: typeof FETCH_SEIHEKI,
    payload: Promise<Seiheki>
}

export interface FetchSeihekiFulFilledAction {
    type: typeof FETCH_SEIHEKI_FULFILLED,
    payload: Seiheki
}

export interface FetchSeihekisAction {
    type: typeof FETCH_SEIHEKIS,
    payload: Promise<Collection<Seiheki>>
}

export interface FetchSeihekisPendingAction {
    type: typeof FETCH_SEIHEKIS_PENDING
}

export interface FetchSeihekisFulfilledAction {
    type: typeof FETCH_SEIHEKIS_FULFILLED,
    payload: Collection<Seiheki>
}

export interface FetchSeihekisRejectedAction {
    type: typeof FETCH_SEIHEKIS_REJECTED
}

export type SeihekisAction
    = FetchSeihekiAction
    | FetchSeihekiFulFilledAction
    | FetchSeihekisAction
    | FetchSeihekisPendingAction
    | FetchSeihekisFulfilledAction
    | FetchSeihekisRejectedAction

export function fetchSeiheki(client: Client, seihekiId: number): FetchSeihekiAction {
    return {
        type: FETCH_SEIHEKI,
        payload: client.getSeiheki(seihekiId)
    };
}

export function fetchSeihekis(author: string, client: Client) {
    return {
        type: FETCH_SEIHEKIS,
        payload: client.getSeihekis(author, 100, 0, "exclude-history")
            .then(seihekis => {
                return {
                    ...seihekis,
                    collection: seihekis.collection.reverse()
                };
            })
    }
}
