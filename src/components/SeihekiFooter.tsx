import React from "react";
import {Row, Col} from "react-bootstrap";
import UpvotesBadge from "./badges/UpvotesBadge";
import CommentBadge from "./badges/CommentBadge";
import Seiheki from "../types/Seiheki";

interface Properties {
    value: Seiheki;
    onCommentClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export default function SeihekiFooter(props: Properties) {
    const seiheki = props.value;
    return (
        <Row>
            <Col xs={{ span: 4, offset: 2}} onClick={(e: React.MouseEvent<Element, MouseEvent>) => props.onCommentClick(e)}>
                <CommentBadge>{seiheki.commentIds.length}</CommentBadge>
            </Col>
            <Col xs={{ span: 4 }} onClick={(e: React.MouseEvent<Element, MouseEvent>) => props.onUpvotesClick(e)}>
                <UpvotesBadge>{seiheki.upvotes}</UpvotesBadge>
            </Col>
        </Row>
    );
}
