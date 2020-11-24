import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";

export const useButtonStyles = makeStyles((theme: Theme) => createStyles({
    colorPrimary: {color: "#1da1f2"},
    colorSecondary: {color: "#6c757d"},
}));

export const useTextFieldStyles = makeStyles((theme: Theme) => createStyles({
    root: { width: "100%" },
}));

export const useModalStyles = makeStyles((theme: Theme) => createStyles({
    modal: {
        margin: '5%',
        display: 'block',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.default,
    },
    header: {
        padding: '12px',
        backgroundColor: theme.palette.background.default,
    },
    content: {
        padding: '12px',
        height: '40vh',
        overflow: 'scroll',
    },
}))
