import {Container, Tab, Tabs} from "react-bootstrap";
import Home from "./Home";
import Timeline from "./Timeline";
import React from "react";

export default function App() {
    return (
        <Container>
            <Tabs defaultActiveKey="my-seihekis" className="m-2" >
                <Tab eventKey="my-seihekis" title="Home">
                    <Home />
                </Tab>
                <Tab eventKey="theme" title="Timeline">
                    <Timeline />
                </Tab>
            </Tabs>
        </Container>
    );
}
