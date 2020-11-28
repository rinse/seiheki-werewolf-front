import React from "react";
import Seiheki from "../types/Seiheki";
import {Grid} from "@material-ui/core";
import {FavoriteBorder, Reply} from "@material-ui/icons";
import IconButton from "@material-ui/core/IconButton";
import {useUpvoteStyles} from "./StyleHooks";

interface Properties {
    value: Seiheki;
    onCommentClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export default function SeihekiFooter(props: Properties) {
    const seiheki = props.value;
    const { iconButton, ...rippleClasses } = useUpvoteStyles();
    return (
        <Grid container>
            <Grid item xs={2} />
            <Grid item xs={4}>
                <IconButton onClick={(e: React.MouseEvent<Element, MouseEvent>) => props.onCommentClick(e)}>
                    <Reply />
                </IconButton>
                {seiheki.commentIds.length}
            </Grid>
            <Grid item xs={4}>
                <IconButton className={iconButton}
                            TouchRippleProps={{classes: rippleClasses}}
                            onClick={(e: React.MouseEvent<Element, MouseEvent>) => props.onUpvotesClick(e)}>
                    <FavoriteBorder />
                </IconButton>
                {seiheki.upvotes}
            </Grid>
        </Grid>
    );
}
