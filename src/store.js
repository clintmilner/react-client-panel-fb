/**
 * User: clint
 * Date: 26/09/2018
 * Time: 08:28
 *
 * Rebasoft - Network Intelligence
 */

import { createStore, combineReducers, compose } from 'redux';
import firebase from 'firebase';
import 'firebase/firestore';
import { reactReduxFirebase, firebaseReducer } from 'react-redux-firebase';
import { reduxFirestore, firestoreReducer } from 'redux-firestore';

// Custom Reducers
// TODO

// firebase webapp config
const firebaseConfig = {
    apiKey: "AIzaSyDBASi2yMBASpu2qHqji9VcVQW7-HRO8LY",
    authDomain: "react-client-panel-311.firebaseapp.com",
    databaseURL: "https://react-client-panel-311.firebaseio.com",
    projectId: "react-client-panel-311",
    storageBucket: "react-client-panel-311.appspot.com",
    messagingSenderId: "346529272635"
};

// react-redux-firebase config
const rrfConfig = {
    userProfile: 'users',
    useFirestoreForProfile: true // enables Firestore for Profile instead of older Realtime DB
};

// init the firebase instance
firebase.initializeApp( firebaseConfig );

// init the firestore
const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
    reactReduxFirebase( firebase, rrfConfig ), // firebase instance as first argument
    reduxFirestore( firebase ) // firestore instance as second argument
)(createStore);


// Add firebase to our reducers
const rootReducer = combineReducers({
    firebase: firebaseReducer,
    firestore: firestoreReducer
});

// Set up initial State
const initialState = {};

// create store
const store = createStoreWithFirebase( rootReducer, initialState, compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__&& window.__REDUX_DEVTOOLS_EXTENSION__()
));

export default store;