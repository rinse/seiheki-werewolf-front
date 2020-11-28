import React from "react";
import Seiheki from "../types/Seiheki";
import {createStyles, makeStyles, Theme, Typography} from "@material-ui/core";
import SeihekiFooter from "./SeihekiFooter";
import {Help} from "@material-ui/icons";
import grey from "@material-ui/core/colors/grey";
import Box from "@material-ui/core/Box";

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
        <Box border={1} borderColor="#dee2e6">
            <Box m={4} display="flex" flexDirection="row">
                <Box mr={4}>
                    <Help className={classes.avatar} fontSize="large" />
                </Box>
                <Typography className={classes.typography}>{seiheki.content}</Typography>
            </Box>
            <SeihekiFooter value={seiheki}
                           onUpvotesClick={e => props.onUpvotesClick(e)}
                           onCommentClick={e => props.onCommentClick(e)} />
        </Box>
    );
}
