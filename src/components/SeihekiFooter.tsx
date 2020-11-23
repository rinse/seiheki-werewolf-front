import React from "react";
import CommentBadge from "./badges/CommentBadge";
import Seiheki from "../types/Seiheki";
import {Grid} from "@material-ui/core";
import {FavoriteBorder} from "@material-ui/icons";

interface Properties {
    value: Seiheki;
    onCommentClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export default function SeihekiFooter(props: Properties) {
    const seiheki = props.value;
    return (
        <Grid container>
            <Grid item xs={2} />
            <Grid item xs={4}
                  onClick={(e: React.MouseEvent<Element, MouseEvent>) => props.onCommentClick(e)}>
                <CommentBadge>{seiheki.commentIds.length}</CommentBadge>
            </Grid>
            <Grid item xs={4} onClick={(e: React.MouseEvent<Element, MouseEvent>) => props.onUpvotesClick(e)}>
                <FavoriteBorder /> {seiheki.upvotes}
            </Grid>
        </Grid>
    );
}
