import {
    FETCH_HISTORY_FULFILLED,
    FETCH_HISTORY_PENDING,
    FETCH_HISTORY_REJECTED,
    FETCH_SEIHEKI_FULFILLED
} from "../actionTypes";
import Seiheki from "../types/Seiheki";
import {HistoryAction} from "../actions/historyActions";

interface HistoryState {
    history: {
        sizeRemains: number,
        nextOffset: number,
        collection: Seiheki[]
    },
    pending: boolean,
    fulfilled: boolean,
    rejected: boolean
}

const initialState: HistoryState =  {
    history: {
        sizeRemains: 0,
        nextOffset: 0,
        collection: []
    },
    pending: false,
    fulfilled: false,
    rejected: false
}

export default function historyReducer(state: HistoryState = initialState, action: HistoryAction) {
    switch (action.type) {
        case FETCH_HISTORY_PENDING: {
            return { history: state.history, pending: true, fulfilled: false, rejected: false }
        }
        case FETCH_HISTORY_REJECTED: {
            return { history: state.history, pending: false, fulfilled: false, rejected: true }
        }
        case FETCH_HISTORY_FULFILLED: {
            return { history: action.payload, pending: false, fulfilled: true, rejected: false }
        }
        case FETCH_SEIHEKI_FULFILLED: {
            const seiheki = action.payload;
            const collection = [...state.history.collection];
            const i = collection.findIndex(e => e.seihekiId === seiheki.seihekiId);
            if (i >= 0) {
                collection[i] = seiheki;
                return { ...state, history: { ...state.history, collection: collection } };
            }
            break;
        }
        default:
            break;
    }
    return state;
}
