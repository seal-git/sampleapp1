import React from "react";
import {
    BrowserRouter as Router,
    Link,
    Route,
    Switch,
    useHistory
} from "react-router-dom";
// import {createBrowserHistory} from "history";
import logo from './logo.svg';
import './App.css';
import Menu from './components/Menu.js'
import Content from './components/Content.js'
import SST2 from './components/SST2.js'


function App() {
    // const myHistory = createBrowserHistory(
    //     {basename: '/yoshinari/'}
    // );
    return (
        <Router basename="/yoshinari">
            <div className="App">
                <Switch>
                    <Route exact path='/' component={Menu}/>
                    <Route exact path='/is-it-sentence' component={Content}/>
                    <Route exact path='/feedback' component={SST2}/>
                    <Route exact component={Menu}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
