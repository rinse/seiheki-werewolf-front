import React from "react";
import SeihekiComment from "../types/SeihekiComment";
import {FavoriteBorder} from "@material-ui/icons";
import {Grid} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import {useUpvoteStyles} from "./StyleHooks";

interface Properties {
    value: SeihekiComment;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export default function CommentFooter({ value, onUpvotesClick }: Properties) {
    const { iconButton, ...rippleClasses } = useUpvoteStyles();
    return (
        <Grid container>
            <Grid item xs={6} />
            <Grid item xs={4}>
                <IconButton className={iconButton}
                            TouchRippleProps={{classes: rippleClasses}}
                            onClick={(e: React.MouseEvent<Element, MouseEvent>) => onUpvotesClick(e)}>
                    <FavoriteBorder />
                </IconButton>
                {value.upvotes}
            </Grid>
        </Grid>
    );
}
