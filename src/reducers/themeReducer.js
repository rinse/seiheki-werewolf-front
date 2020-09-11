import {
    FETCH_SEIHEKI_FULFILLED,
    FETCH_THEME_FULFILLED,
    FETCH_THEME_PENDING,
    FETCH_THEME_REJECTED
} from "../actionTypes";

const
    emptyState = {
    theme: {
        seihekiId: null,
        author: "",
        content: "Theme will be shown here.",
        upvotes: 0,
        commentIds: []
    },
    pending: false,
    fulfilled: false,
    rejected: false
}

export default function themeReducer(state = emptyState, action) {
    switch (action.type) {
        case FETCH_THEME_PENDING: {
            return { theme: state.theme, pending: true, fulfilled: false, rejected: false }
        }
        case FETCH_THEME_REJECTED: {
            return { theme: state.theme, pending: false, fulfilled: false, rejected: true }
        }
        case FETCH_THEME_FULFILLED: {
            if (action.payload.collection.length <= 0) {
                return emptyState;
            }
            return { theme: action.payload.collection[0], pending: false, fulfilled: true, rejected: false }
        }
        case FETCH_SEIHEKI_FULFILLED: {
            const seiheki = action.payload;
            if (seiheki.seihekiId !== state.theme.seihekiId) {
                break;
            }
            return { ...state, theme: seiheki };
        }
        default:
            break;
    }
    return state;
}
