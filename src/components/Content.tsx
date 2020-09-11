import React, {ReactNode} from "react";

interface Properties {
    children: ReactNode;
}

export default function Content({ children }: Properties) {
    return (
        <div style={{whiteSpace: "pre-wrap"}}>{children}</div>
    );
}
