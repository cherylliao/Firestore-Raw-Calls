import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import rootReducer from '../reducers/rootReducer';
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from 'redux-thunk';
import {reactReduxFirebase, getFirebase} from 'react-redux-firebase'
import {reduxFirestore, getFirestore} from 'redux-firestore'
import firebase from '../../features/auth/firebase.utils'

//auth potential problems
const rrfConfig ={
    userProfile: 'users',
    attachAuthIsReady: true,
    useFirestoreForProfile: true

}

const configureStore = () => {

    const middlewares= [thunk.withExtraArgument({getFirebase, getFirestore})]
    const composedEnhander = composeWithDevTools(applyMiddleware(...middlewares),
    reactReduxFirebase(firebase,rrfConfig), reduxFirestore(firebase))
    const store=createStore(rootReducer,
        composedEnhander)

    return store;
}

export default configureStore
