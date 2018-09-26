/**
 * User: clint
 * Date: 26/09/2018
 * Time: 07:55
 *
 * Milner.io
 */

import React from 'react';
import Clients from '../clients/Clients';
import Sidebar from './Sidebar';


export default () => {
    return (
        <div className="row">
            <div className="col-md-10">
                <Clients />
            </div>
            <div className="col-md-2">
                <Sidebar />
            </div>
        </div>
    );
}