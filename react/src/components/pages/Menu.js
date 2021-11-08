
import React from 'react';
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import './Content.css'
import Home from '../templates/Home.js'
import {css, jsx} from '@emotion/react'
import {Typography, Button} from "@material-ui/core";
import {useState, useContext} from "react"
import axios from "axios";

const style = css`
  background-color: #00ad5f;
`
function Feedback(props) {

    return (
        <Home>
            <div css={style}>
                <Link to='/is-it-sentence'>is it sentence</Link>
            </div>
            <div css={style}>
                <Link to='/feedback'>SST-2 anno</Link>
            </div>
        </Home>
    )
}

export default Feedback;
