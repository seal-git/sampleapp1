import React from 'react';
import {Typography, Button} from "@material-ui/core";
import {useState, useContext} from "react"
import axios from "axios";
import './Content.css'
import Home from './Home'

function Feedback(props) {

    return (
        <Home>
            <div className="content-wrapper">
                <div className="content-title">
                    <Typography variant="h1">
                        content
                    </Typography>
                </div>
            </div>
        </Home>
    )
}

export default Feedback;