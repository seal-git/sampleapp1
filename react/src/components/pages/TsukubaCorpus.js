import React, {useEffect} from 'react';
import {css} from "@emotion/react";
import {Typography} from "@material-ui/core";
import {useState, useContext,} from "react"
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";
import {myAxios} from "../myAxios";

import Home from '../templates/Home'
import Header from "../organisms/Header";
import Button from "../atoms/Button";
import PageTemplate from "../organisms/PageTemplate";
import button from "../atoms/Button";
import CheckBox from "../molecules/CheckBox";


function TsukubaCorpus(props) {

    const [sentence, setSentence] = useState('loading...');
    const [id, setId] = useState();
    const [label, setLabel] = useState();
    useEffect(() => {
        initSession();
    }, [])
    useEffect(() => {
        //チェックがないときはnextボタンを無効化する
        let element = document.getElementById("next");
        if (label===null || label===undefined) {
            element.disabled = true;
            // element.setAttribute("aria-disabled", "true")
        }else{
            element.disabled = false;
            // element.setAttribute("aria-disabled", "false")
        }
    }, [label])

    let wrapperStyle = css`
      background-color: white;
      padding: 10px;
    `
    let titleStyle = css`
      font-size: 2rem;
      text-align: left;
    `
    let optionAreaStyle = css`
      display: flex;
      justify-content: flex-end;
    `
    let sentenceAreaStyle = css`
      margin: 20px 10% 20px 10%;
      text-align: left;
      box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.3);

      .id-area {
        padding: 0 2rem 0 2rem;
        background-color: #B1F1FF;
      }

      .sentence-area {
        padding: 0 2rem 0 2rem;
        min-height: 10rem;
      }
    `
    let buttonAreaStyle = css`
      display: flex;
      justify-content: center;
      gap: 20px;
    `

    let search = useLocation().search;
    let query = new URLSearchParams(search);
    let userId = query.get("userId");

    async function initSession() {
        let sentence, id;
        let data = {};
        if (userId !== null) {
            data = {
                "user_id": userId,
            }
        }
        await myAxios.post('/api/get_sentence', data)
            .then(result => {
                console.log(result)
                sentence = result["data"]["sentence"];
                id = result["data"]["id"];
                console.log(sentence)
                setSentence(sentence);
                setId(id);
                if (userId === null) {
                    userId = result["data"]["user_id"];
                    window.history.replaceState({}, "", `?userId=${userId}`)
                }
            })
            .catch(error => {
                return 'error';
            })
    }

const onClickYes = () => {
    const data = {data: sentence};
    myAxios.post('/api/SendFeedback', data)
        .then(result => {
            console.log('yes')
            initSession();
        })
        .catch(error => {
            console.log('error')
        })
}

const onClickNext = () => {
    const data = {
        "sentence": sentence,
        "user_id": userId, //100000~999999
        "label": label
    };
    setSentence("loading...")
    myAxios.post('/api/SendFeedback', data)
        .then(result => {
            console.log('yes')
            console.log(result)
            setSentence(result["data"]["sentence"]);
            setId(result["data"]["id"]);
            setLabel(result["data"]["label"])
        })
        .catch(error => {
            console.log('error')
            setSentence(error)
        })
    //labelを空にしてフォームクリア
    setLabel();
}
const onClickBack = () => {
    const data = {
        "user_id": userId, //100000~999999
        "val": label
    };
    setSentence("loading...")
    myAxios.post('/api/back', data)
        .then(result => {
            console.log('back')
            console.log(result)
            setSentence(result["data"]["sentence"]);
            setId(result["data"]["id"]);
            setLabel(result["data"]["label"])
        })
        .catch(error => {
            console.log('error')
            setSentence(error)
        })
}

const showUsage = () => {

}

return (
    <PageTemplate>
        <div css={wrapperStyle}>
            <div css={titleStyle}>
                Type A
            </div>
            <div css={optionAreaStyle}>
                <Button type={"usage"} onClick={initSession}/>
            </div>
            <div css={sentenceAreaStyle}>
                <div className={"id-area"}>
                    ID {id}
                </div>
                <div className={"sentence-area"}>
                    {sentence}
                </div>
            </div>
            <div css={buttonAreaStyle}>
                <Button type={"back"} onClick={onClickBack}/>
                <CheckBox setLabel={setLabel} label={label}/>
                <Button type={"next"} id={"next"} onClick={onClickNext}/>
            </div>
        </div>
    </PageTemplate>
)
}

export default TsukubaCorpus;