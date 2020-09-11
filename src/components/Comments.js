import React, {useContext, useEffect, useState} from "react";
import Comment from "./Comment"
import {ClientContext} from "./Contexts";


/**
 * @param {number[]} props.commentIds Array of Comment
 * @param {number} props.seihekiId Id of seiheki which the comment belongs to.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Comments(props) {
    const client = useContext(ClientContext);
    const [comments, setComments] = useState([]);
    useEffect(() => {
        Promise.all(props.commentIds.map(commentId => {
                return client.getSeihekiComment(props.seihekiId, commentId);
            }))
            .then(comments => {
                setComments(comments);
            });
    }, [props.seihekiId, props.commentIds])
    return Object.entries(comments)
        .map(([i, comment]) => {
            return (<Comment key={comment.commentId} value={comment}
                             onUpvotesClick={() => handleUpvotesClick(i, comment.commentId, client, props.seihekiId, comments, setComments)} />)
        });
}

function handleUpvotesClick(i, commentId, client, seihekiId, comments, setComments) {
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
