import React, {useState} from "react";
import {Grid} from "@material-ui/core";
import {FavoriteBorder} from "@material-ui/icons";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon2 from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import CommentBadge from "./badges/CommentBadge";
import Seiheki from "../types/Seiheki";


interface Properties {
    value: Seiheki;
    onUpvotesClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onCommentClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onDisposeClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onShuffleClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

export default function ThemeFooter(props: Properties) {
    const seiheki = props.value;
    const [showMenu, setShowMenu] = useState(null as null | HTMLElement);
    return (
        <Grid container>
            <Grid item xs={2} />
            <Grid item xs={4}
                 onClick={(e: React.MouseEvent<Element, MouseEvent>) => props.onCommentClick(e)}>
                <CommentBadge>{seiheki.commentIds.length}</CommentBadge>
            </Grid>
            <Grid item xs={4} onClick={(e: React.MouseEvent<Element, MouseEvent>) => props.onUpvotesClick(e)}>
                <FavoriteBorder /> {seiheki.upvotes}
            </Grid>
            <IconButton onClick={e => setShowMenu(e.currentTarget)}>
                <span style={{fill: "#6c757d" }}>
                    <MenuIcon2 />
                </span>
            </IconButton>
            <Grid item xs>
                <Menu open={Boolean(showMenu)} anchorEl={showMenu} onClose={() => setShowMenu(null)}>
                    <MenuItem onClick={e => props.onShuffleClick(e)}>お題をシャッフルする</MenuItem>
                    <MenuItem onClick={e => props.onDisposeClick(e)}>お題を履歴に送る</MenuItem>
                </Menu>
            </Grid>
        </Grid>
    );
}
