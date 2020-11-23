import React from "react";
import {Button, Form} from "react-bootstrap";
import TextareaAutosize from 'react-textarea-autosize';
import HowToPlay from "./HowToPlay";
import Seihekis from "./Seihekis";
import {ClientContext} from "./Contexts"
import Send from "./icons/Send";
import Reload from "./icons/Reload";
import {useDispatch, useSelector} from "react-redux";
import {putAuthor} from "../actions/authorActions";
import {fetchSeihekis} from "../actions/seihekiActions";
import {RootState} from "../reducers/rootReducer";
import Client from "../api/v3/Client";
import {Dispatch} from "redux";


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
    return (
        <div className="container">
            <div className="text-center">
                <HowToPlay />
            </div>
            <Form>
                <Form.Group controlId="author">
                    <Form.Control type="text" placeholder="お名前をご入力ください"
                                  onChange={e => { dispatch(putAuthor(e.target.value)); } } />
                </Form.Group>
                <Form.Group>
                    <TextareaAutosize className="form-control" placeholder="ご性癖をご入力ください" value={content}
                                      onChange={e => { setContent(e.target.value); } } />
                </Form.Group>
            </Form>
            <div className="text-right">
                <Button variant="link" style={{fill: "#6c757d"}}
                        onClick={() => handleUpdate(client, author, dispatch)}>
                    <Reload />
                </Button>
                <Button variant="link" disabled={submitButtonDisabled} style={{fill: "#1da1f2"}}
                        onClick={() => handleSubmit(client, author, content, setContent, dispatch)}>
                    <Send />
                </Button>
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
