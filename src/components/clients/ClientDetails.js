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
import Loading from '../layout/Loading';

class ClientDetails extends React.Component{
    constructor(props){
        super(props);

        this.state = {}
    }

    render(){
        const { client } = this.props;
        if(client){
            return <h1>{client.firstName}</h1>
        } else {
            return <Loading/>
        }
    }
}

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