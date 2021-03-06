import React, {useEffect} from 'react';
import {css} from "@emotion/react";
import {useState, useContext} from "react"
import axios from "axios";
import Home from '../templates/Home'
import {myAxios} from "../myAxios";

import {ReactComponent as InfoIcon} from "../assets/info_icon.svg";
import {ReactComponent as NextIcon} from "../assets/next_icon.svg";
import {ReactComponent as BackIcon} from "../assets/back_icon.svg";

function Button(props) {

    let wrapperStyle = css`
      display: flex;
      justify-content: center;
      button {
        padding: 10px;
        box-shadow: 0 4px 4px 0 rgba(0, 0, 0, 0.5);
        background-color: #E6E6E6;
        cursor: pointer;
        //padding: 5px 10px 5px 10px;
        border: none;
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
      }

      svg {
        height: 1rem;
        width: 1rem;
      }
    `

    let bigButtonStyle = css`
      ${wrapperStyle};
      display: block;
      button {
        flex-flow: column;
        font-size: 1rem;
      }
      svg {
        height: 3rem;
        width: 3rem;
        fill: black;
      }
    }
    `

    let text;
    let icon;
    if (props.type == "usage") {
        text = "使いかた"
        icon = <InfoIcon/>
    } else if (props.type == "next") {
        wrapperStyle = css`
          ${bigButtonStyle};
          button{
            background-color: #B3FFB1;
          }
          button[disabled] {
            cursor: default;
            background-color: #E6E6E6;
            svg{
              fill: #9e9e9e;
              pointer-events: none;
            }
          }
        `
        icon = <NextIcon/>
        text = "次へ"
    } else if (props.type == "back") {
        wrapperStyle = css`
          ${bigButtonStyle};
        `
        icon = <BackIcon/>
        text = "戻る"
    }else{
        text = props.text;
    }

    return (
        <div css={wrapperStyle}>
            <button
                onClick={props.onClick}
                id={props.id}
                disabled={props.disabled}
            >
                {icon}
                {text}
            </button>
        </div>

    )
}


export default Button;