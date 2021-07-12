import React from 'react';
import {useState, useContext} from "react"
import "./Home.css"
import "./Content.js"
import axios from "axios";
import Content from "./Content";
// import { useHistory, useLocation } from 'react-router-dom'


// ベースコンポーネントとして使う
function Home(props) {

    return (
        <div className="Home">
            <Content/>
        </div>
    );
}

export default Home;