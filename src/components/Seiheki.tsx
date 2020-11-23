import React, {useContext, useState} from "react";
import {Button, Form, Modal} from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import SeihekiBody from "./SeihekiBody";
import Comments from "./Comments";
import {useDispatch, useSelector} from "react-redux";
import {ClientContext} from "./Contexts";
import {fetchSeiheki} from "../actions/seihekiActions";
import Send from "./icons/Send";
import {RootState} from "../reducers/rootReducer";
import SeihekiObj from "../types/Seiheki";
import Client from "../api/v3/Client";
import {Dispatch} from "redux";

interface Props {
    value: SeihekiObj
}

export default function Seiheki(props: Props) {
    const seiheki = props.value;
    const [showComments, setShowComments] = useState(false);
    const [comment, setComment] = useState("");
    const author = useSelector((state: RootState) => state.author);
    const isCommentSendButtonDisabled = comment.length <= 0 || author.length <= 0;
    const client = useContext(ClientContext);
    const dispatch = useDispatch();
    return (
        <div>
            <SeihekiBody value={seiheki}
                         onUpvotesClick={() => upvoteSeiheki(seiheki.seihekiId, client, dispatch)}
                         onCommentClick={() => setShowComments(true)} />
            <Modal show={showComments} onHide={() => setShowComments(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>お嬢様御一同からのご評注</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <SeihekiBody value={seiheki}
                                 onUpvotesClick={() => upvoteSeiheki(seiheki.seihekiId, client, dispatch)}
                                 onCommentClick={() => { /* Do nothing */ }} />
                    <div className="p-1" style={{backgroundColor: "#e6ecf0"}}/>
                    <Form>
                        <Form.Group className="mb-0">
                            <TextareaAutosize className="form-control" placeholder="評注をご入力ください" value={comment}
                                              onChange={e => setComment(e.target.value)} />
                        </Form.Group>
                    </Form>
                    <div className="text-right">
                        <Button variant="link" disabled={isCommentSendButtonDisabled} style={{fill: "#1da1f2"}}
                                onClick={() => sendCommentClick(seiheki.seihekiId, author, comment, client, dispatch, setComment)}>
                            <Send />
                        </Button>
                    </div>
                    <Comments seihekiId={seiheki.seihekiId} commentIds={seiheki.commentIds} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

function upvoteSeiheki(seihekiId: number, client: Client, dispatch: Dispatch<any>) {
    client.patchSeihekiUpvotes(seihekiId)
        .then(() => {
            return dispatch(fetchSeiheki(client, seihekiId))
        });
}

function sendCommentClick(seihekiId: number, author: string, comment: string, client: Client, dispatch: Dispatch<any>, setComment: React.Dispatch<React.SetStateAction<string>>) {
    return client.postSeihekiComment(seihekiId, author, comment)
        .then(() => setComment(''))
        .then(() => {
            return dispatch(fetchSeiheki(client, seihekiId))
        });
}
