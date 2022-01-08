import React, {useEffect} from 'react';
import {css} from "@emotion/react";
import {Typography} from "@material-ui/core";
import {useState, useContext} from "react"
import axios from "axios";
import {myAxios} from "../myAxios";

function Usage(props){
    let wrapperStyle = css`
      background-color: rgba(0,0,0,0.5);
      visibility: ${props.visible === true ? "visible" : "hidden"};
    `
    return(
        <div css={wrapperStyle}>
            aaa
        </div>
    )
}

export default Usage;