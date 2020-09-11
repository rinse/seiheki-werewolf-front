import React from "react";
import Content from "./Content";
import CommentFooter from "./CommentFooter";
import SeihekiComment from "../types/SeihekiComment";

interface Properties {
    value: SeihekiComment;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => any;
}

export default function Comment({ value, onUpvotesClick }: Properties) {
    return (
        <div className="border">
            <div className="m-4">
                <div><strong>{value.author}</strong></div>
                <Content>{value.content}</Content>
            </div>
            <CommentFooter value={value} onUpvotesClick={e => onUpvotesClick(e)} />
        </div>
    );
}
