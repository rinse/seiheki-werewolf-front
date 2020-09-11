import React from "react";
import Seiheki from "./Seiheki";

/**
 * @param {Object[]} props.value Array of Seiheki.
 * @returns {JSX.Element}
 * @constructor
 */
export default function Seihekis(props) {
    return props.value
        .map(seiheki => {
            return (<Seiheki key={seiheki.seihekiId} value={seiheki} />)
        });
}
