/**
 * User: clint
 * Date: 26/09/2018
 * Time: 07:55
 *
 * Milner.io
 */

import React from 'react';
import {Link} from 'react-router-dom';

class Clients extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const clients = [{
            id: '89238223',
            firstName: 'Clint',
            lastName: 'Milner',
            email: 'clinton.milner@gmail.com',
            phone: '07519242324',
            balance: '311'
        }];
        if(clients) {
            return (
                <div>
                    <div className="row">
                        <div className="col-md-6">
                            <h2><i className="fas fa-fw fa-users"></i> Clients</h2>
                        </div>
                        <div className="col-md-6">

                        </div>
                    </div>
                    <table className="table table-striped">
                        <thead className="thead-inverse">
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Balance</th>
                            <th />
                        </tr>
                        </thead>
                        <tbody>
                        {
                            clients.map((client) => {
                                return <tr key={client.id}>
                                    <td>{client.firstName} {client.lastName}</td>
                                    <td>{client.email}</td>
                                    <td>${parseFloat(client.balance).toFixed(2)}</td>
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
            return <h1>Loading...</h1>
        }
    }
};

export default Clients;