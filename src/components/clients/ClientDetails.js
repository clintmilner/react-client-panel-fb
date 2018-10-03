/**
 * User: clint
 * Date: 27/09/2018
 * Time: 20:41
 *
 * Rebasoft - Network Intelligence
 */

import React from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Loading from '../layout/Loading';

class ClientDetails extends React.Component {
    constructor(props) {
        super(props);
        this.toggleBalanceUpdate = this.toggleBalanceUpdate.bind(this);
        this.handleBalanceUpdateChange = this.handleBalanceUpdateChange.bind(this);
        this.submitBalanceUpdate = this.submitBalanceUpdate.bind(this);
        this.handleDeleteClient = this.handleDeleteClient.bind(this);

        this.state = {
            showBalanceUpdate: false,
            balanceUpdateAmount: ''
        }
    }

    toggleBalanceUpdate() {
        this.setState((prevState) => {
            return ({
                showBalanceUpdate: !prevState.showBalanceUpdate
            })
        });
    }

    handleDeleteClient() {
        const { firestore, client, history } = this.props;

        firestore.delete({
            collection: 'clients',
            doc: client.id
        })
        .then(() => {
            history.push('/')
        })
    }

    handleBalanceUpdateChange = (e) => this.setState({[e.target.name]: e.target.value});

    submitBalanceUpdate(e) {
        e.preventDefault();
        console.log(this.state.balanceUpdateAmount);
        const {client, firestore} = this.props;
        const {balanceUpdateAmount} = this.state;

        const clientUpdate = {
            balance: parseFloat(balanceUpdateAmount)
        };

        // Update in Firestore
        firestore.update({
            collection: 'clients',
            doc: client.id
        }, clientUpdate);
    }

    render() {
        const {client} = this.props,
            {showBalanceUpdate, balanceUpdateAmount} = this.state;
        let balanceForm = '';

        // if balance form should display
        if(showBalanceUpdate) {
            balanceForm = (
                <form onSubmit={this.submitBalanceUpdate}>
                    <div className="input-group">
                        <input type="text" name='balanceUpdateAmount' placeholder='Add New Balance'
                               value={balanceUpdateAmount} onChange={this.handleBalanceUpdateChange}
                               className="form-control"/>
                        <div className="input-group-append">
                            <input type="submit" value='Update' className='btn btn-outline-dark'/>
                        </div>
                    </div>
                </form>
            )
        } else {
            balanceForm = null;
        }


        if(client) {
            return (
                <React.Fragment>
                    <div className="row">
                        <div className="col-md-6">
                            <Link to='/' className='btn btn-link'>
                                <i className="fas fa-fw fa-arrow-circle-left"></i> Back To Dashboard
                            </Link>
                        </div>
                        <div className="col-md-6">
                            <div className="btn-group btn-group-sm float-right">
                                <Link to={`/client/edit/${client.id}`} className='btn btn-dark'>Edit</Link>
                                <button className="btn btn-danger" onClick={this.handleDeleteClient}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="card">
                                <h4 className="card-header">
                                    {client.firstName} {client.lastName}
                                </h4>
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-md-8 col-sm-6">
                                            <h4>Client ID: <span className="text-secondary">{client.id}</span></h4>
                                        </div>
                                        <div className="col-md-4 col-sm-6">
                                            <h3 className='pull-right'>Balance:
                                                <span className={classnames({
                                                    'text-danger': client.balance > 0,
                                                    'text-success': client.balance === 0
                                                })}>
                                                    ${parseFloat(client.balance / 100).toFixed(2)}
                                                </span>
                                                {' '}
                                                <small>
                                                    <button className='btn btn-default btn-sm'
                                                            onClick={this.toggleBalanceUpdate}><i
                                                        className="fas fa-fw fa-pencil-alt"></i></button>
                                                </small>
                                            </h3>
                                            {balanceForm}
                                        </div>
                                    </div>
                                    <hr/>
                                    <ul className="list-group">
                                        <li className="list-group-item">Contact Email: {client.email}</li>
                                        <li className="list-group-item">Contact Phone: {client.phone}</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </React.Fragment>
            )
        } else {
            return <Loading/>
        }
    }
}

ClientDetails.propTypes = {
    firestore: PropTypes.object.isRequired
};

export default compose(
    firestoreConnect(props => [{
        collection: 'clients',
        storeAs: 'client',
        doc: props.match.params.id
    }]),
    connect(({firestore: {ordered}}, props) => ({
        client: ordered.client && ordered.client[0]
    }))
)(ClientDetails);