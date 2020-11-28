import React from "react";
import Seiheki from "./Seiheki";
import SeihekiObj from "../types/Seiheki";
import Box from "@material-ui/core/Box";

interface Props {
    value: SeihekiObj[]
}


export default function Seihekis(props: Props) {
    return (
        <Box>
            {props.value.map(seiheki => <Seiheki key={seiheki.seihekiId} value={seiheki} />)}
        </Box>
    );
}
