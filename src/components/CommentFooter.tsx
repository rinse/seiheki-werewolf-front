import React from "react";
import SeihekiComment from "../types/SeihekiComment";
import {FavoriteBorder} from "@material-ui/icons";
import {Grid} from "@material-ui/core";

interface Properties {
    value: SeihekiComment;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export default function CommentFooter({ value, onUpvotesClick }: Properties) {
    return (
        <Grid container>
            <Grid item xs={6} />
            <Grid item xs={4} onClick={(e: React.MouseEvent<Element, MouseEvent>) => onUpvotesClick(e)}>
                <FavoriteBorder /> {value.upvotes}
            </Grid>
        </Grid>
    );
}
