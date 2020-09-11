import React from "react";
import Content from "./Content";
import QuestionCircle from "./icons/QuestionCircle"
import ThemeFooter from "./ThemeFooter";
import Seiheki from "../types/Seiheki";
import {DropdownItemProps} from "react-bootstrap/DropdownItem";

interface Properties {
    value: Seiheki;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onCommentClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onDisposeClick: (e: React.MouseEvent<DropdownItemProps, MouseEvent>) => void;
    onShuffleClick: (e: React.MouseEvent<DropdownItemProps, MouseEvent>) => void;
}

/**
 * @param props.value
 * @param props.onCommentClick
 * @param props.onUpvotesClick
 * @returns {JSX.Element}
 * @constructor
 */
export default function ThemeBody(props: Properties) {
    const seiheki = props.value;
    return (
        <div className="border">
            <div className="m-4 d-flex flex-row">
                <div className="mr-4" onClick={e => props.onCommentClick(e)} style={{color: "#6c757d"}}>
                    <QuestionCircle />
                </div>
                <div onClick={e => props.onCommentClick(e)}>
                    <Content>{seiheki.content}</Content>
                </div>
            </div>
            <ThemeFooter value={seiheki}
                         onUpvotesClick={e => props.onUpvotesClick(e)}
                         onCommentClick={e => props.onCommentClick(e)}
                         onDisposeClick={e => props.onDisposeClick(e)}
                         onShuffleClick={e => props.onShuffleClick(e)}/>
        </div>
    );
}
