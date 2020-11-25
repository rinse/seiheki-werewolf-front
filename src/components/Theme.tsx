import React from "react";
import Modal from "@material-ui/core/Modal";
import Comments from "./Comments";
import ThemeBody from "./ThemeBody";
import {ClientContext} from "./Contexts";
import {useDispatch, useSelector} from "react-redux";
import {fetchSeiheki} from "../actions/seihekiActions";
import Seiheki from "../types/Seiheki";
import {RootState} from "../reducers/rootReducer";
import Client from "../api/v3/Client";
import {Dispatch} from "redux";
import {IconButton} from "@material-ui/core";
import SendIcon from "@material-ui/icons/Send";
import CardContent from "@material-ui/core/CardContent";
import {useButtonStyles, useModalStyles, useTextFieldStyles} from "./StyleHooks";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Fade from "@material-ui/core/Fade";
import Card from "@material-ui/core/Card";
import Backdrop from "@material-ui/core/Backdrop";
import {putAuthor} from "../actions/authorActions";


interface Props {
    value: Seiheki
    onDisposeClick: (e: React.MouseEvent<Element, MouseEvent>) => void
    onShuffleClick: (e: React.MouseEvent<Element, MouseEvent>) => void
}

export default function Theme(props: Props) {
    const seiheki = props.value;
    const [showComments, setShowComments] = React.useState(false);
    const [comment, setComment] = React.useState("");
    const author = useSelector((state: RootState) => state.author);
    const isCommentSendButtonDisabled = comment.length <= 0 || author.length <= 0;
    const client = React.useContext(ClientContext);
    const dispatch = useDispatch();
    const modalStyles = useModalStyles();
    const buttonStyles = useButtonStyles();
    const textFieldStyles = useTextFieldStyles();
    return (
        <div>
            <ThemeBody value={seiheki}
                       onUpvotesClick={() => handleOnUpvotesClickTheme(seiheki.seihekiId, client, dispatch)}
                       onCommentClick={() => setShowComments(true)} />
            <Modal open={showComments} onClose={() => setShowComments(false)}
                       BackdropComponent={Backdrop}
                       className={modalStyles.modal}
                       closeAfterTransition>
                <Fade in={showComments}>
                    <Card>
                        <CardContent className={modalStyles.header}>
                            <Typography variant="h5">お嬢様御一同からのご評注</Typography>
                            <ThemeBody value={seiheki}
                                       onUpvotesClick={() => handleOnUpvotesClickTheme(seiheki.seihekiId, client, dispatch)}
                                       onCommentClick={() => {}} />
                            <TextField label="評注をご入力ください" value={comment} multiline classes={textFieldStyles} required
                                       onChange={e => setComment(e.target.value)} />
                            <TextField label="お名前" value={author}
                                       size="small" variant="standard" required
                                       onChange={e => { dispatch(putAuthor(e.target.value)); }} />
                            <IconButton color="primary" classes={buttonStyles} disabled={isCommentSendButtonDisabled}
                                        onClick={() => sendComment(seiheki.seihekiId, author, comment, client, dispatch, setComment)}>
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
