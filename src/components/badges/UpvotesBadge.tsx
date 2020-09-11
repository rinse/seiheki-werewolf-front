import React from "react";
import Upvotes from "../icons/Upvotes";

interface Properties {
    children: number;
}

export default function UpvotesBadge({ children }: Properties) {
    return (
        <div>
            <Upvotes /> {children}
        </div>
    );
}
