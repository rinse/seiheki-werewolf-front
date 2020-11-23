import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container} from "@material-ui/core";
import ThemeHeader from "./ThemeHeader";
import Seihekis from "./Seihekis";
import Theme from "./Theme";
import {ClientContext} from "./Contexts";
import {fetchTheme} from "../actions/themeActions";
import {fetchHistory} from "../actions/historyActions";
import Client from "../api/v3/Client";
import {Dispatch} from "redux";
import {RootState} from "../reducers/rootReducer";


export default function Timeline() {
    const theme = useSelector((state: RootState) => state.theme);
    const history = useSelector((state: RootState) => state.history);
    const dispatch = useDispatch();
    const client = React.useContext(ClientContext);
    React.useEffect(() => {
        handleReloadClick(client, dispatch);
    }, [client, dispatch])
    return (
        <Container>
            <ThemeHeader onReloadClick={() => handleReloadClick(client, dispatch)} />
            <Theme value={theme.theme}
                   onDisposeClick={() => disposeTheme(theme.theme.seihekiId, client, dispatch)}
                   onShuffleClick={() => shuffleTheme(client, dispatch)}/>
            <div className="p-1" style={{backgroundColor: "#e6ecf0"}}/>
            <Seihekis value={history.history.collection} />
        </Container>
    );
}

function handleReloadClick(client: Client, dispatch: Dispatch<any>) {
    dispatch(fetchTheme(client));
    dispatch(fetchHistory(client));
}

function shuffleTheme(client: Client, dispatch: Dispatch<any>) {
    client.postCards()
        .then(() => handleReloadClick(client, dispatch));
}

function disposeTheme(seihekiId: number, client: Client, dispatch: Dispatch<any>) {
    client.deleteCard(seihekiId)
        .then(() => handleReloadClick(client, dispatch))
        .then(() => {
            // re-render seihekis and history and theme
        })
}
