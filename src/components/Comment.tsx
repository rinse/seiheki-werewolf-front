import React from "react";
import CommentFooter from "./CommentFooter";
import SeihekiComment from "../types/SeihekiComment";
import {Typography} from "@material-ui/core";

interface Properties {
    value: SeihekiComment;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => any;
}

export default function Comment({ value, onUpvotesClick }: Properties) {
    return (
        <div className="border">
            <div className="m-4">
                <Typography noWrap><b>{value.author}</b></Typography>
                <Typography>{value.content}</Typography>
            </div>
            <CommentFooter value={value} onUpvotesClick={e => onUpvotesClick(e)} />
        </div>
    );
}
