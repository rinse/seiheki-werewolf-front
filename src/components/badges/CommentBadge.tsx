import React from "react";
import Comments from "../icons/Comments";

interface Properties {
    children: number
}

export default function CommentBadge({ children }: Properties) {
    return (
        <div>
            <Comments /> {children}
        </div>
    );
}
