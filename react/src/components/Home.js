import React from 'react';
import {useState, useContext} from "react"
import "./Home.css"
import "./Content.js"
import "./SST2.js"
import axios from "axios";
import Content from "./Content";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'


// ベースコンポーネントとして使う
function Home(props) {
    return (
        <div className='Home'>
            <header>
                <Link to='/'>
                    top
                </Link>
            </header>
            {props.children}
            <footer>
                footer
            </footer>
        </div>
    );
}

export default Home;