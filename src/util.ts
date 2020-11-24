import Client from "./api/v3/Client";
import {Dispatch} from "redux";
import {fetchTheme} from "./actions/themeActions";
import {fetchHistory} from "./actions/historyActions";


export function handleReloadClick(client: Client, dispatch: Dispatch<any>) {
    dispatch(fetchTheme(client));
    dispatch(fetchHistory(client));
}

export function shuffleTheme(client: Client, dispatch: Dispatch<any>) {
    client.postCards()
        .then(() => handleReloadClick(client, dispatch));
}

export function disposeTheme(seihekiId: number, client: Client, dispatch: Dispatch<any>) {
    client.deleteCard(seihekiId)
        .then(() => handleReloadClick(client, dispatch))
        .then(() => {
            // re-render seihekis and history and theme
        })
}
