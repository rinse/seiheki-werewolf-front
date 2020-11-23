import React from "react";
import Content from "./Content";
import SeihekiFooter from "./SeihekiFooter";
import Seiheki from "../types/Seiheki";

interface Properties {
    value: Seiheki;
    onCommentClick: (e: React.MouseEvent<Element, MouseEvent>) => any;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => any;
}

export default function SeihekiBody(props: Properties) {
    const seiheki = props.value;
    return (
        <div className="border">
            <div className="m-4">
                <div><strong>{seiheki.author}</strong></div>
                <Content>{seiheki.content}</Content>
            </div>
            <SeihekiFooter value={seiheki} onUpvotesClick={e => props.onUpvotesClick(e)} onCommentClick={e => props.onCommentClick(e)} />
        </div>
    );
}
