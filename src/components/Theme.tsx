import React from "react";
import {Button, Form, Modal} from "react-bootstrap";
import TextareaAutosize from "react-textarea-autosize";
import Comments from "./Comments";
import ThemeBody from "./ThemeBody";
import {ClientContext} from "./Contexts";
import {useDispatch, useSelector} from "react-redux";
import {fetchSeiheki} from "../actions/seihekiActions";
import Send from "./icons/Send";
import {DropdownItemProps} from "react-bootstrap/DropdownItem";
import Seiheki from "../types/Seiheki";
import {RootState} from "../reducers/rootReducer";
import Client from "../api/v3/Client";
import {Dispatch} from "redux";

interface Props {
    value: Seiheki
    onDisposeClick: (e: React.MouseEvent<DropdownItemProps, MouseEvent>) => void
    onShuffleClick: (e: React.MouseEvent<DropdownItemProps, MouseEvent>) => void
}

export default function Theme(props: Props) {
    const seiheki = props.value;
    const [showComments, setShowComments] = React.useState(false);
    const [comment, setComment] = React.useState("");
    const author = useSelector((state: RootState) => state.author);
    const isCommentSendButtonDisabled = comment.length <= 0 || author.length <= 0;
    const client = React.useContext(ClientContext);
    const dispatch = useDispatch();
    return (
        <div>
            <ThemeBody value={seiheki}
                       onUpvotesClick={() => handleOnUpvotesClickTheme(seiheki.seihekiId, client, dispatch)}
                       onCommentClick={() => setShowComments(true)}
                       onDisposeClick={e => props.onDisposeClick(e)}
                       onShuffleClick={e => props.onShuffleClick(e)}/>
            <Modal show={showComments} onHide={() => setShowComments(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>お嬢様御一同からのご評注</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ThemeBody value={seiheki}
                               onUpvotesClick={() => handleOnUpvotesClickTheme(seiheki.seihekiId, client, dispatch)}
                               onCommentClick={() => {}}
                               onDisposeClick={e => props.onDisposeClick(e)}
                               onShuffleClick={e => props.onShuffleClick(e)}/>
                    <div className="p-1" style={{backgroundColor: "#e6ecf0"}}/>
                    <Form>
                        <Form.Group className="mb-0">
                            <TextareaAutosize className="form-control" placeholder="評注をご入力ください" value={comment}
                                              onChange={e => setComment(e.target.value)} />
                        </Form.Group>
                    </Form>
                    <div className="text-right">
                        <Button variant="link" disabled={isCommentSendButtonDisabled} style={{fill: "#1da1f2"}}
                                onClick={() => sendComment(seiheki.seihekiId, author, comment, client, dispatch, setComment)}>
                            <Send />
                        </Button>
                    </div>
                    <Comments seihekiId={seiheki.seihekiId} commentIds={seiheki.commentIds} />
                </Modal.Body>
            </Modal>
        </div>
    );
}

function handleOnUpvotesClickTheme(seihekiId: number, client: Client, dispatch: Dispatch<any>) {
    client.patchSeihekiUpvotes(seihekiId)
        .then(() => {
            dispatch(fetchSeiheki(client, seihekiId));
        })
}

function sendComment(seihekiId: number, author: string, comment: string, client: Client, dispatch: Dispatch<any>, setComment: React.Dispatch<React.SetStateAction<string>>) {
    return client.postSeihekiComment(seihekiId, author, comment)
        .then(() => setComment(''))
        .then(() => {
            return dispatch(fetchSeiheki(client, seihekiId))
        });
}