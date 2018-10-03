import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import './App.css';
import AddClient from './components/clients/AddClient';
import ClientDetails from './components/clients/ClientDetails';
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
                                <Route exact path='/client/add' component={AddClient}/>
                                <Route exact path='/client/:id' component={ClientDetails}/>
                            </Switch>
                        </div>
                    </div>
                </BrowserRouter>
            </Provider>
        );
    }
}

export default App;
