import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import React, {useState} from "react";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";


interface Props {
    onDisposeClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
    onShuffleClick: (e: React.MouseEvent<Element, MouseEvent>) => void;
}

const useGMMenuStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        color: "#ffffff",
    }
}));

export default function GMMenu(props: Props) {
    const [showMenu, setShowMenu] = useState(null as null | HTMLElement);
    const gmMenuStyles = useGMMenuStyles();
    return (
        <div>
            <IconButton onClick={e => setShowMenu(e.currentTarget)}>
                <MenuIcon classes={gmMenuStyles} />
            </IconButton>
            <Menu open={Boolean(showMenu)} anchorEl={showMenu} onClose={() => setShowMenu(null)}>
                <MenuItem onClick={e => props.onShuffleClick(e)}>お題をシャッフルする</MenuItem>
                <MenuItem onClick={e => props.onDisposeClick(e)}>お題を履歴に送る</MenuItem>
            </Menu>
        </div>
    );
}
