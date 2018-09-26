/**
 * User: clint
 * Date: 26/09/2018
 * Time: 07:55
 *
 * Milner.io
 */

import React from 'react';
import { Link } from 'react-router-dom';

class AppNavBar extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
                <div className="container">
                    <Link className='navbar-brand' to='/'>ClientPanel</Link>
                    <button type='button' data-toggle="collapse" data-target="#navbarMain" className="navbar-toggler">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarMain">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <Link className='nav-link' to='/'>Dashboard</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        );
    }
};

export default AppNavBar;