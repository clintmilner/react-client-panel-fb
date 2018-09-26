import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import AppNavBar from './components/layout/AppNavBar';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <AppNavBar/>
                    <div className="container">
                        <h1>Hello</h1>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
