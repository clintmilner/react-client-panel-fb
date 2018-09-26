import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import AppNavBar from './components/layout/AppNavBar';
import Dashboard from './components/layout/Dashboard';

import {Provider} from 'react-redux';
import store from './store';

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <BrowserRouter>
                    <div className="App">
                        <AppNavBar/>
                        <div className="container">
                            <Switch>
                                <Route exact path='/' component={Dashboard}/>
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
