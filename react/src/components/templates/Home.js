import React from 'react';
import {css} from '@emotion/react';
import {useState, useContext} from "react"
import "../pages/Content.js"
import "../pages/SST2_old.js"
import Content from "../pages/Content";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'


// ベースコンポーネントとして使う
const style = css`
  html, body, #root, .App {
    min-height: 100vh;
    background-color: #0b2e13;
  }

  min-height: 100vh;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;

  header {
    width: 100%;
  }
`

function Home(props) {
    return (
        <div css={style} className={'Home'}>
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