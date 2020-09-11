import React from "react";
import UpvotesBadge from "./badges/UpvotesBadge";
import {Col, Row} from "react-bootstrap";
import SeihekiComment from "../types/SeihekiComment";

interface Properties {
    value: SeihekiComment;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export default function CommentFooter({ value, onUpvotesClick }: Properties) {
    return (
        <Row>
            <Col xs={{ span: 4, offset: 6 }} onClick={(e: React.MouseEvent<Element, MouseEvent>) => onUpvotesClick(e)}>
                <UpvotesBadge>{value.upvotes}</UpvotesBadge>
            </Col>
        </Row>
    );
}
