/**
 * User: clint
 * Date: 26/09/2018
 * Time: 07:55
 *
 * Milner.io
 */

import React from 'react';
import {Link} from 'react-router-dom';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {firestoreConnect} from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Loading from '../layout/Loading';

class Clients extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            totalOwed: null
        }
    }

    static getDerivedStateFromProps(props, state) {
        const { clients } = props;

        if(clients){
            const total = clients.reduce( (total, client) => {
                return total += parseFloat(client.balance.toString());
            }, 0);

           return {
               totalOwed: total
           }
        }
    }

    render() {
        const {clients} = this.props,
            {totalOwed} = this.state;

        if(clients) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <h2><i className="fas fa-fw fa-users"></i> Clients</h2>
                        </div>
                        <div className="col-md-6">
                            <h5 className="text-right text-secondary">
                                Total Owed:{ ' ' }
                                <span className="text-primary">
                                    ${ parseFloat(totalOwed/100).toLocaleString() }
                                </span>
                            </h5>
                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead className="thead-inverse">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Balance</th>
                            <th/>
                        </tr>
                        </thead>
                        <tbody>
                        {
                            clients.map((client) => {
                                return <tr key={client.id}>
                                    <td>{client.firstName} {client.lastName}</td>
                                    <td>{client.email}</td>
                                    <td>${parseFloat(client.balance / 100).toFixed(2)}</td>
                                    <td>
                                        <Link to={`/client/${client.id}`} className='btn btn-secondary btn-sm'>
                                            <i className="fas fa-fw fa-arrow-circle-right"></i> Details
                                        </Link>
                                    </td>
                                </tr>
                            })
                        }
                        </tbody>
                    </table>
                </div>
            );
        } else {
            return <Loading/>
        }
    }
};

Clients.propTypes = {
    firestore: PropTypes.object.isRequired,
    clients: PropTypes.array
};

export default compose(
    firestoreConnect([{collection: 'clients'}]),
    connect((state, props) => ({
            clients: state.firestore.ordered.clients
        })
    )
)(Clients);