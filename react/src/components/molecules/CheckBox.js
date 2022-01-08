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
    
    `
    const [checked,setChecked] = useState();
    useEffect(()=> {
        //フォームクリアしたらチェックボックスもクリア
        if(props.label === undefined){
            setChecked()
        }else{
            setChecked(props.label)
        }
    }, [props.label])

    const onChange = (e) =>{
        setChecked(e.target.id)
        props.setLabel(e.target.id)
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
                name={"option"}
                id={"k"}
                value={"苦情"}
                checked={checked}
                onChange={onChange}
            />
        </div>
    )

}

export default CheckBox