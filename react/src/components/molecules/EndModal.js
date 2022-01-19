import React, {useEffect, useRef} from 'react';
import {css} from "@emotion/react";
import {Typography} from "@material-ui/core";
import {useState, useContext} from "react"
import axios from "axios";
import {myAxios} from "../myAxios";
import Button from "../atoms/Button";
import {Link} from "react-router-dom";

function EndModal(props) {
    const inputRef = useRef("");
    let nextUrl;
    if (props.next != null) {
        nextUrl = "/tsukuba-corpus?dataGroup=" + props.next["data_group"];
    }

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
    `
    let formStyle = css`
      font-size: large;
      font-family: Arial;

      textarea {
        width: 100%;
        height: 8rem;
        resize: none;
        font-size: 1.2rem;
      }

    `
    let buttonAreaStyle = css`
      padding-top: 30px;
    `

    const onKeyPress = (e) => {
        // Ctrl+Enterキーで送信
        if (e.key === "\n") {
            onButtonClick();
        }
    }

    const onButtonClick = () => {
        // フォームの値を取得
        let comment = inputRef.current;
        comment = comment.value;

        // データを送信
        let data = {
            "user_id": props.userId,
            "comment": comment,
        };
        console.log(data);
        myAxios.post('/api/comment', data)
            .then(result => {
                console.log(result["data"])

            })
            .catch(error => {
                return 'error';
            })

    }
    const onLinkClick = () => {
        props.close();
        props.init(props.next["user_id"], props.next["data_group"])
    }
    console.log(props.next)
    return (
        <div css={wrapperStyle}>
            <h1>
                アノテーション完了
            </h1>
            <p>
                ご協力ありがとうございました🙇‍♂ <br/>
                何かフィードバックありましたらコメントお願いします
            </p>
            <p>
                これで終了する場合、このウィンドウは閉じてください <br/>
            </p>
            <p>
                <b>続ける場合は<Link to={nextUrl}
                               onClick={onLinkClick}>こちらをクリック</Link></b>
            </p>
            <div css={formStyle}>
                <textarea ref={inputRef}
                          onKeyPress={onKeyPress}
                />
            </div>
            <div css={buttonAreaStyle}>
                <Button id={"submit"}
                        text={"送信"}
                        onClick={onButtonClick}
                />
            </div>
        </div>
    )
}

export default EndModal;