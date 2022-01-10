import React, {useEffect} from 'react';
import {css} from "@emotion/react";
import {Typography} from "@material-ui/core";
import {useState, useContext} from "react"
import axios from "axios";
import {myAxios} from "../myAxios";
import Button from "../atoms/Button";

function Usage(props){
    let wrapperStyle = css`
      background-color: whitesmoke;
      width: 50vh;
      min-height: 20vh;
      border-radius: 10px;
      padding: 30px;
      display: flex;
      flex-flow: column;
      justify-content: center;
    `
    return(
        <div css={wrapperStyle}>
            <p>
            ホテルのレビュー文が出ます.<br/>
            文に最も合うと思うラベルを一つ付けてください．
            </p>
            <Button text={"閉じる"} onClick={props.close}/>
        </div>
    )
}

export default Usage;