import React, {useState} from "react";
import {createStyles} from "@material-ui/core";
import Home from "./Home";
import Timeline from "./Timeline";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../reducers/rootReducer";
import {ClientContext} from "./Contexts";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import GMMenu from "./GMMenu";
import {disposeTheme, shuffleTheme} from "../util";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import TabPanel from "./TabPanel";
import Box from "@material-ui/core/Box";


const useNavStyles = makeStyles(() =>
    createStyles({
        root: {
            width: '100%',
            backgroundColor: "#20232a",
        },
        title: {
            color: "#ffffff",
            flexGrow: 1,
        },
        element: {
            color: "#ffffff",
        },
        selected: {
            color: "#61dafb",
        },
    }),
);

export default function App() {
    const styles = useNavStyles();
    const theme = useSelector((state: RootState) => state.theme);
    const dispatch = useDispatch();
    const client = React.useContext(ClientContext);
    const [tabValue, setTabValue] = useState(0);
    return (
        <Box>
            <AppBar position="static" classes={{root: styles.root}}>
                <Toolbar>
                    <Typography variant="h6" className={styles.title}>
                        <Link href="/" color="inherit" underline="none">性癖人狼</Link>
                    </Typography>
                    <Tabs value={tabValue} onChange={(e, value) => setTabValue(value)}>
                        <Tab label="HOME"/>
                        <Tab label="TIMELINE"/>
                    </Tabs>
                    <GMMenu onDisposeClick={() => disposeTheme(theme.theme.seihekiId, client, dispatch)}
                            onShuffleClick={() => shuffleTheme(client, dispatch)}/>
                </Toolbar>
            </AppBar>
            <Box padding={2}>
                <TabPanel index={0} value={tabValue}>
                    <Home />
                </TabPanel>
                <TabPanel index={1} value={tabValue}>
                    <Timeline />
                </TabPanel>
            </Box>
        </Box>
    );
}
