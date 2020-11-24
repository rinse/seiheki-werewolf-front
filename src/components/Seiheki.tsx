import React, {useContext, useState} from "react";
import {IconButton} from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Modal from "@material-ui/core/Modal";
import SeihekiBody from "./SeihekiBody";
import Comments from "./Comments";
import SendIcon from "@material-ui/icons/Send";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import {useButtonStyles, useModalStyles, useTextFieldStyles} from "./StyleHooks";
import {useDispatch, useSelector} from "react-redux";
import {ClientContext} from "./Contexts";
import {fetchSeiheki} from "../actions/seihekiActions";
import {RootState} from "../reducers/rootReducer";
import SeihekiObj from "../types/Seiheki";
import Client from "../api/v3/Client";
import {Dispatch} from "redux";
import {putAuthor} from "../actions/authorActions";

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
    const modalStyles = useModalStyles();
    const buttonStyles = useButtonStyles();
    const textFieldStyles = useTextFieldStyles();
    return (
        <div>
            <SeihekiBody value={seiheki}
                         onUpvotesClick={() => upvoteSeiheki(seiheki.seihekiId, client, dispatch)}
                         onCommentClick={() => setShowComments(true)} />
            <Modal open={showComments} onClose={() => setShowComments(false)}
                    BackdropComponent={Backdrop}
                    className={modalStyles.modal}
                    closeAfterTransition
                    >
                <Fade in={showComments}>
                    <Card>
                        <CardContent className={modalStyles.header}>
                            <Typography variant="h5">お嬢様御一同からのご評注</Typography>
                            <SeihekiBody value={seiheki}
                                         onUpvotesClick={() => upvoteSeiheki(seiheki.seihekiId, client, dispatch)}
                                         onCommentClick={() => { /* Do nothing */ }} />
                            <TextField label="評注をご入力ください" value={comment} multiline classes={textFieldStyles}
                                       onChange={e => setComment(e.target.value)} />
                            <TextField label="お名前" value={author}
                                       size="small" variant="standard" required
                                       onChange={e => { dispatch(putAuthor(e.target.value)); }} />
                            <IconButton color="primary" classes={buttonStyles} disabled={isCommentSendButtonDisabled}
                                        onClick={() => sendCommentClick(seiheki.seihekiId, author, comment, client, dispatch, setComment)}>
                                <SendIcon fontSize="large" />
                            </IconButton>
                        </CardContent>
                        <CardContent className={modalStyles.content} >
                            <Comments seihekiId={seiheki.seihekiId} commentIds={seiheki.commentIds} />
                        </CardContent>
                    </Card>
                </Fade>
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
