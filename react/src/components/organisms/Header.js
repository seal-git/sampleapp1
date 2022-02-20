import React, {useEffect, useState, useContext} from 'react';
import {css} from "@emotion/react";
import {Typography} from "@material-ui/core";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from 'react-router-dom'
import axios from "axios";
import {myAxios} from "../myAxios";
import Home from '../templates/Home'
import Button from "../atoms/Button";

function Header(props) {
    let wrapperStyle = css`
      background-color: #233033;
      display: flex;
      font-size: 1.5rem;
      justify-content: space-between;
      //a {
      //  text-decoration: none
      //}
    `
    let leftWrapperStyle = css`
      display: flex;
      flex-flow: column;
      justify-content: center;
      color: whitesmoke;
      text-align: left;
    `
    let rightWrapperStyle = css`
      display: flex;
      color: whitesmoke;
      text-align: left;
    `
    let TextStyle = css`
      margin: 15px;
      color: whitesmoke;
      gap: 2rem;
      display: inline-block;
    `
    let rightTextStyle = css`
    `


    return (
        <div css={wrapperStyle}>
            <div css={leftWrapperStyle}>
                <Link to={"/tsukuba-corpus"}>
                    <div css={TextStyle}>
                        ダレカノ
                    </div>
                </Link>
            </div>
            <div css={rightWrapperStyle}>
                <Link to={"/tsukuba-corpus"}>
                <div css={TextStyle}>Home</div>
                <div css={TextStyle}>About Us</div>
                </Link>
            </div>
        </div>
    )
}

export default Header