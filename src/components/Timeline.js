import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container} from "react-bootstrap";
import ThemeHeader from "./ThemeHeader";
import Seihekis from "./Seihekis";
import Theme from "./Theme";
import {ClientContext} from "./Contexts";
import {fetchTheme} from "../actions/themeActions";
import {fetchHistory} from "../actions/historyActions";

/**
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
export default function Timeline(props) {
    const theme = useSelector(state => state.theme);
    const history = useSelector(state => state.history);
    const dispatch = useDispatch();
    const client = React.useContext(ClientContext);
    React.useEffect(() => {
        handleReloadClick(client, dispatch);
    }, [])
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

function handleReloadClick(client, dispatch) {
    dispatch(fetchTheme(client));
    dispatch(fetchHistory(client));
}

function shuffleTheme(client, dispatch) {
    client.postCards()
        .then(() => handleReloadClick(client, dispatch));
}

function disposeTheme(seihekiId, client, dispatch) {
    client.deleteCard(seihekiId)
        .then(() => handleReloadClick(client, dispatch))
        .then(() => {
            // re-render seihekis and history and theme
        })
}
