import React from "react";
import CommentFooter from "./CommentFooter";
import SeihekiComment from "../types/SeihekiComment";
import {Typography} from "@material-ui/core";
import Box from "@material-ui/core/Box";

interface Properties {
    value: SeihekiComment;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => any;
}

export default function Comment({ value, onUpvotesClick }: Properties) {
    return (
        <Box border={1} borderColor="#dee2e6">
            <Box m={4}>
                <Typography noWrap><b>{value.author}</b></Typography>
                <Typography>{value.content}</Typography>
            </Box>
            <CommentFooter value={value} onUpvotesClick={e => onUpvotesClick(e)} />
        </Box>
    );
}
