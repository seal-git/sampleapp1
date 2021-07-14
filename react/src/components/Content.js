import React from 'react';
import './Content.css'
import {Typography, Button} from "@material-ui/core";
import {useState, useContext} from "react"
import {myAxios} from "./myAxios.js";
import Home from './Home'

function Content(props) {
    const [sentence, setSentence] = useState('loading...');

    async function setSentenceFromDB() {
        let sentence;
        await myAxios.post('/api/db_sample_random_generate')
            .then(result => {
                console.log(result)
                sentence = result.data.content.sentence;
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
            <div className="content-wrapper">
                <div className="content-title">
                    <Typography variant="h1">
                        is it sentence?
                    </Typography>
                </div>
                <div className='content-description'>
                    <Typography>
                        文字列がランダムに表示されます．「主語と述語を伴った英文」であればYes，そうでなければNoを押してください．
                    </Typography>
                    <Typography>
                        A string of characters will be displayed randomly.
                        If it is a "correct English sentence" with a subject and
                        predicate,
                        press Yes; otherwise, press No.
                    </Typography>
                </div>
                <div className="btn-area-wrapper">
                    <Button color="primary"
                            variant="contained"
                            onClick={onClickYes}
                    >
                        Yes, it's a correct sentence.
                    </Button>
                    <Button color="secondary"
                            variant="contained"
                    >
                        Not at all.
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

export default Content;