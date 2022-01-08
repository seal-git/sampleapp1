import React, {useEffect} from 'react';
import {css} from "@emotion/react";
import {Typography} from "@material-ui/core";
import {useState, useContext,} from "react"
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";
import {myAxios} from "../myAxios";

import {ReactComponent as BoxIcon} from "../assets/box.svg";
import {ReactComponent as CheckBoxIcon} from "../assets/checkbox.svg";
import CheckBox from "./CheckBox";


function CheckBoxOption(props) {

    let icon;
    if(props.checked == props.id){
        icon = <CheckBoxIcon />
    }else{
        icon = <BoxIcon/>
    }

    let optionStyle = css`
      font-size: 1.5rem;

      input {
        appearance: none;
      }
      svg{
        margin-right: 0.5rem;
        width: 1.2rem;
        height: 1.2rem;
      }
    `

    return (
        <div css={optionStyle}>
            <input type={"radio"}
                   name={"option"}
                   id={props.id}
                   value={props.value}
                   onChange={props.onChange}
            />
            <label for={props.id}>
                {icon}
                {props.value}
            </label>
        </div>
    )

}

export default CheckBoxOption