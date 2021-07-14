import React from "react";
import {BrowserRouter as Router, Link, Route, Switch} from "react-router-dom";
import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu.js'
import Content from './components/Content.js'
import Feedback from './components/Feedback.js'


function App() {
    return (
        <Router>
            <div className="App">
                <Switch>
                    <Route exact path='/' component={Menu}/>
                    <Route exact path='/is-it-sentence' component={Content}/>
                    <Route exact path='/feedback' component={Feedback}/>
                    <Route exact component={Menu}/>
                </Switch>
            </div>
        </Router>
);
}

export default App;
