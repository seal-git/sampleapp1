import React, {useEffect, useRef} from 'react';
import {css} from "@emotion/react";
import {Typography} from "@material-ui/core";
import {useState, useContext} from "react"
import axios from "axios";
import {myAxios} from "../myAxios";
import Button from "../atoms/Button";

function StartModal(props) {
    const inputRef = useRef();
    const [mail, setMail] = useState();
    const [valid, setValid] = useState(false);

    let wrapperStyle = css`
      background-color: whitesmoke;
      width: 50vh;
      min-height: 20vh;
      border-radius: 10px;
      padding: 30px;
      display: flex;
      flex-flow: column;
      justify-content: center;

      h1 {
        font-size: medium;
      }
      max-height: 50vh;
      overflow: scroll;

    `
    let formStyle = css`
      font-size: large;
      font-family: Arial;

      input {
        width: 100%;
        height: 2rem;
      }

      input:invalid {
        border-color: red;
      }
    `
    let buttonAreaStyle = css`
      padding-top: 30px;
    `

    const onChange = (e) => {
        // バリデーションチェックしてボタンのdisableを操作する
        //onKeyPressだとBackSpaceなどが反応しないのでonChangeで発火させる
        if (e.currentTarget.validity.valid === true) {
            setValid(true);
        } else {
            setValid(false);
        }
    }
    const onKeyPress = (e) => {
        // Enterキーで送信
        console.log(e)
        if (e.key === "Enter" && e.target.validity.valid === true) {
            onClick();
        }
    }
    const onClick = () => {
        // フォームの値を取得
        let mailValue = inputRef.current;
        mailValue = mailValue.value;

        // データを送信
        let data = {
            "user_id": props.userId,
            "mail": mailValue,
        };
        console.log(data);
        myAxios.post('/api/user', data)
            .then(result => {
                console.log(result["data"])
            })
            .catch(error => {
                return 'error';
            })

        // モーダルを閉じる
        props.close();
    }
    return (
        <div css={wrapperStyle}>
            <h1>
                はじめに
            </h1>
            <p>
                アクセスありがとうございます😃
            </p>
            <p>
                本ページでは、ホテルのレビュー文に対してラベルを付与していただきます。全部で200文、所要時間は15分程です。
            </p>
            <p>
                アノテーション後に何点かお尋ねすることがあるかもしれないので、連絡していいメールアドレスを教えてください。
            </p>

            <div css={formStyle}>
                <input ref={inputRef}
                       id={"mail"}
                       type={"email"}
                       name={"mail"}
                       autoFocus={"focus"}
                       title={"メールアドレスを入力してください"}
                       onChange={onChange}
                       onKeyPress={onKeyPress}
                       required={true}
                />
            </div>
            <div css={buttonAreaStyle}>
                <Button id={"submit"} text={"OK"} onClick={onClick}
                        disabled={!valid}/>
            </div>
        </div>
    )
}

export default StartModal;