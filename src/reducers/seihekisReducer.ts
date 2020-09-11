import {
    FETCH_SEIHEKI_FULFILLED,
    FETCH_SEIHEKIS_FULFILLED,
    FETCH_SEIHEKIS_PENDING,
    FETCH_SEIHEKIS_REJECTED
} from "../actionTypes";
import Seiheki from "../types/Seiheki";
import {SeihekisAction} from "../actions/seihekiActions"

interface SeihekisState {
    seihekis: {
        sizeRemains: number,
        nextOffset: number,
        collection: Seiheki[]
    },
    pending: boolean,
    fulfilled: boolean,
    rejected: boolean
}

const initialState = {
    seihekis: {
        sizeRemains: 0,
        nextOffset: 0,
        collection: []
    },
    pending: false,
    fulfilled: false,
    rejected: false
}

export default function seihekisReducer(state: SeihekisState = initialState, action: SeihekisAction) {
    switch (action.type) {
        case FETCH_SEIHEKIS_PENDING: {
            return { seihekis: state.seihekis, pending: true, fulfilled: false, rejected: false }
        }
        case FETCH_SEIHEKIS_REJECTED: {
            return { seihekis: state.seihekis, pending: false, fulfilled: false, rejected: true }
        }
        case FETCH_SEIHEKIS_FULFILLED: {
            return { seihekis: action.payload, pending: false, fulfilled: true, rejected: false }
        }
        case FETCH_SEIHEKI_FULFILLED: {
            const seiheki = action.payload;
            const collection = [...state.seihekis.collection];
            const i = collection.findIndex(e => e.seihekiId === seiheki.seihekiId);
            if (i < 0) {
                break;
            }
            collection[i] = seiheki;
            return { ...state, seihekis: { ...state.seihekis, collection: collection } };
        }
        default:
            break;
    }
    return state;
}
