import React, {useEffect} from 'react';
import {css} from "@emotion/react";
import {useState, useContext} from "react"
import axios from "axios";
import Home from '../templates/Home'
import {myAxios} from "../myAxios";


function Button(props) {

    let wrapperStyle = css`
      background-color: #61dafb;
      display: inline-flex;
      cursor: pointer;
    `


return(
    <button css={wrapperStyle}
         onClick={props.onClick}
    >
        {props.text}
    </button>
)
}


export default Button;