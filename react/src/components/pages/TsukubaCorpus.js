import React, {useEffect, useRef} from 'react';
import {css} from "@emotion/react";
import {Typography} from "@material-ui/core";
import {useState, useContext,} from "react"
import {useLocation, useParams} from "react-router-dom";
import axios from "axios";
import {myAxios} from "../myAxios";
import {useModal} from "react-hooks-use-modal";

import Home from '../templates/Home'
import Header from "../organisms/Header";
import Button from "../atoms/Button";
import PageTemplate from "../organisms/PageTemplate";
import CheckBox from "../molecules/CheckBox";
import UsageModal from "../molecules/UsageModal";
import StartModal from "../molecules/StartModal";
import EndModal from "../molecules/EndModal";


function TsukubaCorpus(props) {

    const [sentence, setSentence] = useState('loading...');
    const [id, setId] = useState();
    const [label, setLabel] = useState();
    const [next, setNext] = useState("");
    const [Usage, openUsage, closeUsage, isUsageOpen] = useModal("root");
    const [Start, openStart, closeStart, isStartOpen] = useModal("root", {closeOnOverlayClick: false});
    const [End, openEnd, closeEnd, isEndOpen] = useModal("root",);

    // URLクエリからuserId, dataGroupを取得する
    let search = useLocation().search;
    let query = new URLSearchParams(search);
    const [userId, setUserId] = useState(query.get("userId"));
    const [dataGroup, setDataGroup] = useState(query.get("dataGroup"));

    useEffect(() => {
        //初期描画時に文を取得
        initSession(userId);
        //StartModalを表示
        openStart();

    }, [])
    useEffect(() => {
        //チェックがないときはnextボタンを無効化する
        let element = document.getElementById("next");
        if (label === null || label === undefined) {
            element.disabled = true;
            // element.setAttribute("aria-disabled", "true")
        } else {
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
      gap: 30px;
    `


    const initSession = (userId, dataGroup) => {
        let data = {};
        if (userId !== null) {
            data["user_id"] = userId;
        }
        if (dataGroup !== null) {
            data["data_group"] = dataGroup;
        }
        console.log(data)
        myAxios.post('/api/get_sentence', data)
            .then(result => {
                console.log(result["data"])
                setSentence(result["data"]["sentence"]);
                setId(result["data"]["id"]);
                setLabel(result["data"]["label"])
                if (userId === null) {
                    setUserId(result["data"]["user_id"]);
                }
                window.history.replaceState(
                    {},
                    "",
                    `?userId=${result["data"]["user_id"]}`)
            })
            .catch(error => {
                return 'error';
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
                if (result["data"]["last"] === true) {
                    setNext(result["data"]["next"])
                    openEnd();
                }
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


    return (
        <PageTemplate>
            <div css={wrapperStyle}>
                <div css={titleStyle}>
                    Type A
                </div>
                <div css={optionAreaStyle}>
                    <Button type={"usage"} onClick={openUsage}/>
                    <Usage>
                        <UsageModal close={closeUsage}/>
                    </Usage>
                    <Start>
                        <StartModal close={closeStart} userId={userId}/>
                    </Start>
                    <End>
                        <EndModal userId={userId} next={next} close={closeEnd}
                                  init={initSession}/>
                    </End>
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