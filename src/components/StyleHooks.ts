import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {fade} from "@material-ui/core/styles/colorManipulator"

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

export const useUpvoteStyles = makeStyles((theme: Theme) => createStyles({
    iconButton: {
        "&:hover": {
            backgroundColor: fade("rgb(224, 36, 94)", 0.3),
        },
    },
    child: {
        backgroundColor: "rgb(224, 36, 94)",
    },
    rippleVisible: {
        opacity: 0.3,
        animation: `$enter 550ms ${theme.transitions.easing.easeInOut}`,
    },
    "@keyframes enter": {
        "0%": {
            transform: "scale(0)",
            opacity: 0.1,
        },
        "100%": {
            transform: "scale(1)",
            opacity: 0.5,
        },
    },
}));
