import React from "react";
import Seiheki from "./Seiheki";
import SeihekiObj from "../types/Seiheki";

interface Props {
    value: SeihekiObj[]
}

export default function Seihekis(props: Props) {
    return (
        <div>
            {props.value.map(seiheki => <Seiheki key={seiheki.seihekiId} value={seiheki} />)}
        </div>
    );
}
