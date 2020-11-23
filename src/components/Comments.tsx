import React, {useContext, useEffect, useState} from "react";
import Comment from "./Comment"
import {ClientContext} from "./Contexts";
import SeihekiComment from "../types/SeihekiComment";
import Client from "../api/v3/Client";


interface Props {
    seihekiId: number
    commentIds: number[]
}

export default function Comments(props: Props) {
    const client = useContext(ClientContext);
    const [comments, setComments] = useState([] as SeihekiComment[]);
    useEffect(() => {
        Promise.all(props.commentIds.map(commentId => {
                return client.getSeihekiComment(props.seihekiId, commentId);
            }))
            .then(comments => {
                setComments(comments);
            });
    }, [props.seihekiId, props.commentIds, client])
    return (
        <div>
            {comments.map((comment, i) =>
                <Comment key={comment.commentId} value={comment}
                         onUpvotesClick={() => handleUpvotesClick(i, comment.commentId, client, props.seihekiId, comments, setComments)} />)
            }
        </div>);
}

function handleUpvotesClick(i: number, commentId: number, client: Client, seihekiId: number, comments: SeihekiComment[], setComments: React.Dispatch<React.SetStateAction<SeihekiComment[]>>) {
    client.patchSeihekiCommentUpvotes(seihekiId, commentId)
        .then(() => {
            return client.getSeihekiComment(seihekiId, commentId)
        })
        .then(comment => {
            const newComments = [...comments];
            newComments[i] = comment;
            return newComments;
        })
        .then(newComments => {
            setComments(newComments);
        });
}
