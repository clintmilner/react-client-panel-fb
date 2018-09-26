import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import AppNavBar from './components/layout/AppNavBar';
import Dashboard from './components/layout/Dashboard';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <AppNavBar/>
                    <div className="container">
                        <Switch>
                            <Route exact path='/' component={Dashboard} />
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
