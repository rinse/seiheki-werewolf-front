import React from "react";
import HowToPlay from "./HowToPlay";
import Seihekis from "./Seihekis";
import {ClientContext} from "./Contexts"
import {useDispatch, useSelector} from "react-redux";
import {putAuthor} from "../actions/authorActions";
import {fetchSeihekis} from "../actions/seihekiActions";
import {RootState} from "../reducers/rootReducer";
import Client from "../api/v3/Client";
import {Dispatch} from "redux";
import SendIcon from "@material-ui/icons/Send"
import {Refresh} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {useButtonStyles, useTextFieldStyles} from "./StyleHooks";
import TextField from "@material-ui/core/TextField";


export default function Home() {
    const [content, setContent] = React.useState("");
    const author = useSelector((state: RootState) => state.author);
    const submitButtonDisabled = author.length <= 0 || content.length <= 0;
    const seihekis = useSelector((state: RootState) => state.seihekis);
    const dispatch = useDispatch();
    const client = React.useContext(ClientContext);
    React.useEffect(() => {
        handleUpdate(client, author, dispatch);
    }, [author, client, dispatch]);
    const buttonStyles = useButtonStyles();
    const textFieldStyles = useTextFieldStyles();
    return (
        <div className="container">
            <div className="text-center">
                <HowToPlay />
            </div>
            <form>
                <TextField label="お名前をご入力ください" classes={textFieldStyles}
                           value={author}
                           onChange={e => { dispatch(putAuthor(e.target.value)); }} />
                <TextField label="ご性癖をご入力ください" value={content} multiline classes={textFieldStyles}
                           onChange={e => { setContent(e.target.value); }} />
            </form>
            <div className="text-right">
                <IconButton color="secondary" classes={buttonStyles}
                            onClick={() => handleUpdate(client, author, dispatch)}>
                    <Refresh fontSize="large" />
                </IconButton>
                <IconButton color="primary" disabled={submitButtonDisabled} classes={buttonStyles}
                            onClick={() => handleSubmit(client, author, content, setContent, dispatch)}>
                    <SendIcon fontSize="large" />
                </IconButton>
            </div>
            <div className="m-3" />
            <Seihekis value={seihekis.seihekis.collection} />
        </div>
    );
}

function handleSubmit(client: Client, author: string, content: string, setContent: React.Dispatch<React.SetStateAction<string>>, dispatch: Dispatch<any>) {
    return client.postSeihekis(author, content)
        .then(() => handleUpdate(client, author, dispatch))
        .then(() => setContent(""));
}

function handleUpdate(client: Client, author: string, dispatch: Dispatch<any>) {
    dispatch(fetchSeihekis(author, client));
}
