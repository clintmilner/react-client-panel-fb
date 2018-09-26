/**
 * User: clint
 * Date: 26/09/2018
 * Time: 07:55
 *
 * Milner.io
 */

import React from 'react';
import { Link } from 'react-router-dom';

export default () => {
    return (
        <Link to='/client/add' className='btn-success btn btn-block'>
            <i className="fas fa-fw fa-plus"></i> New
        </Link>
    );
}