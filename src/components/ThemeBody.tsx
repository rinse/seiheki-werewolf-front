import React from "react";
import Seiheki from "../types/Seiheki";
import {createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
import SeihekiFooter from "./SeihekiFooter";
import {Help} from "@material-ui/icons";
import grey from "@material-ui/core/colors/grey";

interface Properties {
    value: Seiheki;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onCommentClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export const useStyles = makeStyles((theme: Theme) => createStyles({
    typography: {
        whiteSpace: "pre-line",
    },
    avatar: {
        color: grey[600],
        width: theme.spacing(8),
        height: theme.spacing(8),
    },
}));

export default function ThemeBody(props: Properties) {
    const seiheki = props.value;
    const classes = useStyles();
    return (
        <div className="border">
            <div className="m-4 d-flex flex-row">
                <div className="mr-4">
                    <Help className={classes.avatar} fontSize="large" />
                </div>
                <Typography className={classes.typography}>{seiheki.content}</Typography>
            </div>
            <SeihekiFooter value={seiheki}
                           onUpvotesClick={e => props.onUpvotesClick(e)}
                           onCommentClick={e => props.onCommentClick(e)} />
        </div>
    );
}
