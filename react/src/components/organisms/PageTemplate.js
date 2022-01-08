import React, {useEffect} from 'react';
import {css} from "@emotion/react";
import {Typography} from "@material-ui/core";
import {useState, useContext} from "react"
import axios from "axios";
import {myAxios} from "../myAxios";
import Header from "../organisms/Header";

function PageTemplate(props){
    let wrapperStyle = css`
    `
    return(
        <div css={wrapperStyle}>
            <Header/>
            {props.children}
        </div>
    )
}
export default PageTemplate