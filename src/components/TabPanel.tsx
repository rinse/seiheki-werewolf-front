import {PropsWithChildren, ReactElement} from "react";

interface Props {
    index: number
    value: number
}

export default function TabPanel(props: PropsWithChildren<Props>) {
    if (props.value === props.index) {
        return props.children as ReactElement;
    }
    return null;
}
