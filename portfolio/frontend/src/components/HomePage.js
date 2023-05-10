import React, { Component } from 'react';
import FirstProject from "./FirstProject";
import AboutPage from "./AboutPage";
import Rothko from "./Rothko";
import IdvPictureWrapper from './IdvPicture';
import Modular from "./Modular";
import HomePost from "./posts/HomePost";
import Signup from "./SignUp";
import Login from "./Login";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Link,
    Redirect,
} from "react-router-dom";

export default class HomePage extends Component {
    constructor(props) {
        super(props);
    }


    render() {
        return (
            <Router>
                <Routes>
                    <Route exact path="/" element={<HomePost />} />
                    <Route exact path="/home" element={<HomePost />} />
                    <Route exact path="/rothko" element={<Rothko />} />
                    <Route exact path="/rothko/:picture" element={<IdvPictureWrapper />} />
                    <Route exact path="/first-project" element={<FirstProject />} />
                    <Route exact path="/modular" element={<Modular />} />
                    <Route exact path="/about" element={<AboutPage />} />
                </Routes>
            </Router>
        );
    }
}