import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import './Content.css'
import Home from './Home.js'
import {Typography, Button} from "@material-ui/core";
import {useState, useContext} from "react"
import axios from "axios";

function Feedback(props) {

    return (
        <Home>
            <div className="content-wrapper">
                <Link to='/is-it-sentence'>is it sentence</Link>
                <Link to='/feedback'>SST-2 anno</Link>
            </div>
        </Home>
    )
}

export default Feedback;
