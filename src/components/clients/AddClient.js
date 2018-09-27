/**
 * User: clint
 * Date: 27/09/2018
 * Time: 08:03
 *
 * Milner.io
 */

import React from 'react';
import {Link} from 'react-router-dom';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';

class AddClient extends React.Component {
    constructor(props) {
        super(props);
        this.handleOnSubmit = this.handleOnSubmit.bind(this);

        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            balance: '',
        }
    }

    handleOnChange = (e) => this.setState({[e.target.name]: e.target.value});

    handleOnSubmit(e) {
        e.preventDefault();

        const newClient = this.state,
            {firestore, history} = this.props;

        // if no balance, set to 0
        if(newClient.balance === '') {
            newClient.balance = 0;
        }

        firestore.add({collection: 'clients'}, newClient)
            .then(() => {
                history.push('/');
            })

    }

    render() {
        return (
            <React.Fragment>
                <div className="row">
                    <div className="col-md-6">
                        <Link to='/' className='btn btn-link'>
                            <i className="fas fa-fw fa-arrow-circle-left"></i> Back To Dashboard
                        </Link>
                    </div>
                </div>
                <div className="card">
                    <div className="card-header">Add Client</div>
                    <div className="card-body">
                        <form onSubmit={this.handleOnSubmit}>
                            <div className="form-group">
                                <label htmlFor='firstName'>First Name</label>
                                <input type='text' className="form-control" name='firstName' minLength='2'
                                       required='required' onChange={this.handleOnChange} value={this.state.firstName}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor='lastName'>Last Name</label>
                                <input type='text' className="form-control" name='lastName' minLength='2'
                                       required='required' onChange={this.handleOnChange} value={this.state.lastName}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor='email'>Email</label>
                                <input type='email' className="form-control" name='email' minLength='6'
                                       onChange={this.handleOnChange} value={this.state.email}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor='phone'>Phone</label>
                                <input type='phone' className="form-control" name='phone' minLength='7'
                                       onChange={this.handleOnChange} value={this.state.phone}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor='balance'>Balance</label>
                                <input type='text' className="form-control" name='balance'
                                       onChange={this.handleOnChange} value={this.state.balance}/>
                            </div>
                            <input type="submit" className="btn btn-primary btn-block"/>
                        </form>
                    </div>
                </div>
            </React.Fragment>
        );
    }
};

AddClient.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient);