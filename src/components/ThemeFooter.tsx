import React from "react";
import {Row, Col, Dropdown} from "react-bootstrap";
import UpvotesBadge from "./badges/UpvotesBadge";
import CommentBadge from "./badges/CommentBadge";
import Menu from "./icons/Menu";
import Seiheki from "../types/Seiheki";
import {DropdownItemProps} from "react-bootstrap/DropdownItem";

interface Properties {
    value: Seiheki;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onCommentClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onDisposeClick: (e: React.MouseEvent<DropdownItemProps, MouseEvent>) => void;
    onShuffleClick: (e: React.MouseEvent<DropdownItemProps, MouseEvent>) => void;
}

export default function ThemeFooter(props: Properties) {
    const seiheki = props.value;
    return (
        <Row>
            <Col xs={{ span: 4, offset: 2}}
                 onClick={(e: React.MouseEvent<Element, MouseEvent>) => props.onCommentClick(e)}>
                <CommentBadge>{seiheki.commentIds.length}</CommentBadge>
            </Col>
            <Col xs={{ span: 4 }} onClick={(e: React.MouseEvent<Element, MouseEvent>) => props.onUpvotesClick(e)}>
                <UpvotesBadge>{seiheki.upvotes}</UpvotesBadge>
            </Col>
            <Col>
                <Dropdown>
                    <Dropdown.Toggle variant="link">
                        <span style={{fill: "#6c757d" }}>
                            <Menu />
                        </span>
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                        <Dropdown.Item onClick={e => props.onShuffleClick(e)}>お題をシャッフルする</Dropdown.Item>
                        <Dropdown.Item onClick={e => props.onDisposeClick(e)}>お題を履歴に送る</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
        </Row>
    );
}
