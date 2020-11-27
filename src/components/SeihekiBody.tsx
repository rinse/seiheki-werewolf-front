import React from "react";
import SeihekiFooter from "./SeihekiFooter";
import Seiheki from "../types/Seiheki";
import {createStyles, Theme, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface Properties {
    value: Seiheki;
    onCommentClick: (e: React.MouseEvent<Element, MouseEvent>) => any;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => any;
}

export const useStyles = makeStyles((theme: Theme) => createStyles({
    typography: {
        whiteSpace: "pre-line",
    }
}));

export default function SeihekiBody(props: Properties) {
    const seiheki = props.value;
    const classes = useStyles();
    return (
        <div className="border">
            <div className="m-4">
                <Typography noWrap><b>{seiheki.author}</b></Typography>
                <Typography className={classes.typography}>{seiheki.content}</Typography>
            </div>
            <SeihekiFooter value={seiheki} onUpvotesClick={e => props.onUpvotesClick(e)} onCommentClick={e => props.onCommentClick(e)} />
        </div>
    );
}
