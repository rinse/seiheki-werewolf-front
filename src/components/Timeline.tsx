import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {Container} from "@material-ui/core";
import ThemeHeader from "./ThemeHeader";
import Seihekis from "./Seihekis";
import {ClientContext} from "./Contexts";
import {fetchTheme} from "../actions/themeActions";
import {fetchHistory} from "../actions/historyActions";
import Client from "../api/v3/Client";
import {Dispatch} from "redux";
import {RootState} from "../reducers/rootReducer";
import Seiheki from "./Seiheki";


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
            <Seiheki value={theme.theme} isTheme={true} />
            <div className="p-1" style={{backgroundColor: "#e6ecf0"}}/>
            <Seihekis value={history.history.collection} />
        </Container>
    );
}

function handleReloadClick(client: Client, dispatch: Dispatch<any>) {
    dispatch(fetchTheme(client));
    dispatch(fetchHistory(client));
}
