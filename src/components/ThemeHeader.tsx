import React from "react";
import {Refresh} from "@material-ui/icons";
import {createStyles, IconButton, Theme} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";


interface Props {
    onReloadClick: () => void
}

export const useStyles = makeStyles((theme: Theme) => createStyles({
    title: {flexGrow: 1},
}));

export default function ThemeHeader(props: Props) {
    const classes = useStyles();
    return (
        <Box border={1} borderColor="#dee2e6">
            <Toolbar>
                <Typography variant="h4" className={classes.title}>
                    現在のお題
                </Typography>
                <IconButton onClick={() => props.onReloadClick()}>
                    <Refresh fontSize="large"/>
                </IconButton>
            </Toolbar>
        </Box>
    );
}
