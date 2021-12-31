import React, {useEffect} from 'react';
import {css} from "@emotion/react";
import {Typography, Button} from "@material-ui/core";
import {useState, useContext} from "react"
import axios from "axios";
import './Content.css'
import Home from '../templates/Home'
import {myAxios} from "../myAxios";


function TsukubaCorpus(props) {
    const [sentence, setSentence] = useState('loading...');
    useEffect(()=>{
        setSentenceFromDB();
    }, [])

    let wrapperStyle = css`
      background-color: #00ad5f;
    `

    async function setSentenceFromDB() {
        let sentence;
        await myAxios.post('/api/get_sentence')
            .then(result => {
                console.log(result)
                sentence = result.data;
                console.log(sentence)
                setSentence(sentence);
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
                setSentenceFromDB();
            })
            .catch(error => {
                console.log('error')
            })
    }

    return (
        <Home>
            <div className="content-wrapper" css={wrapperStyle}>
                <div className="content-title">
                    <Typography variant="h1">
                        SST-2 positive or negative
                    </Typography>
                </div>
                <div className='content-description'>
                    <Typography>
                        説明
                    </Typography>
                </div>
                <div className="btn-area-wrapper">
                    <Button color="primary"
                            variant="contained"
                            onClick={onClickYes}
                    >
                        Positive
                    </Button>
                    <Button color="secondary"
                            variant="contained"
                    >
                        Negative
                    </Button>
                </div>
                <div className="sentence-area-wrapper">
                    <Typography align="left">
                        sentence:
                    </Typography>
                    <div className="sentence-area">
                        <Typography align="left">
                            {sentence}
                        </Typography>
                    </div>
                    <Button className="btn-reload"
                            onClick={setSentenceFromDB}
                    >
                        reload sentence
                    </Button>
                </div>
            </div>
        </Home>
    )
}

export default TsukubaCorpus;