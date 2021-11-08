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
import Menu from './components/pages/Menu.js'
import Content from './components/pages/Content.js'
import SST2_old from './components/pages/SST2_old.js'


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
                    <Route exact path='/feedback' component={SST2_old}/>
                    <Route exact component={Menu}/>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
