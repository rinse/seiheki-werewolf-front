import React from "react";
import QuestionCircle from "./icons/QuestionCircle"
import ThemeFooter from "./ThemeFooter";
import Seiheki from "../types/Seiheki";
import {createStyles, Theme, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

interface Properties {
    value: Seiheki;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onCommentClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onDisposeClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onShuffleClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export const useStyles = makeStyles((theme: Theme) => createStyles({
    typography: {
        whiteSpace: "pre-line",
    }
}));

export default function ThemeBody(props: Properties) {
    const seiheki = props.value;
    const classes = useStyles();
    return (
        <div className="border">
            <div className="m-4 d-flex flex-row">
                <div className="mr-4" onClick={e => props.onCommentClick(e)} style={{color: "#6c757d"}}>
                    <QuestionCircle />
                </div>
                <Typography className={classes.typography}>{seiheki.content}</Typography>
            </div>
            <ThemeFooter value={seiheki}
                         onUpvotesClick={e => props.onUpvotesClick(e)}
                         onCommentClick={e => props.onCommentClick(e)}
                         onDisposeClick={e => props.onDisposeClick(e)}
                         onShuffleClick={e => props.onShuffleClick(e)}/>
        </div>
    );
}
