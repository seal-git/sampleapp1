import React, {useEffect} from 'react';
import {css} from "@emotion/react";
import {Typography, Button} from "@material-ui/core";
import {useState, useContext} from "react"
import axios from "axios";
import '../pages/Content.css'
import Home from '../templates/Home'
import {myAxios} from "../myAxios";
import CheckBoxOption from "./CheckBoxOption";

function CheckBox(props) {
    let wrapperStyle = css`
      display: flex;
      flex-flow: column;
      justify-content: left;
      

    `
    const [checked, setChecked] = useState();
    useEffect(() => {
        //チェックボックスのアイコンをinputの状態に合わせる
        if (props.label === undefined) {
            setChecked();
        } else {
            setChecked(props.label);
        }
    },[props.label])

const onChange = (e) => {
    setChecked(e.currentTarget.id)
    props.setLabel(e.currentTarget.id)
}

return (
    <div css={wrapperStyle}>
        <CheckBoxOption
            name={"option"}
            id={"p"}
            value={"褒め"}
            checked={checked}
            onChange={onChange}
        />
        <CheckBoxOption
            id={"k"}
            value={"苦情"}
            checked={checked}
            onChange={onChange}
        />
        <CheckBoxOption
            id={"y"}
            value={"要求"}
            checked={checked}
            onChange={onChange}
        />
        <CheckBoxOption
            id={"e"}
            value={"ニュートラル"}
            checked={checked}
            onChange={onChange}
        />
        <CheckBoxOption
            id={"o"}
            value={"その他"}
            checked={checked}
            onChange={onChange}
        />
    </div>
)

}

export default CheckBox