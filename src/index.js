import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { createStore, applyMiddleware, compose } from 'redux'
import rootReducer from './store/reducers/rootReducer'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { reduxFirestore, getFirestore } from 'redux-firestore';
import { reactReduxFirebase, getFirebase } from 'react-redux-firebase';
import fbConfig from './config/fbConfig'
import { Offline, Online } from "react-detect-offline";
import Off from './offline';



const store = createStore(rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({getFirebase, getFirestore})),
    reactReduxFirebase(fbConfig,{useFirestoreForProfile:true,userProfile:'users',attachAuthIsReady:true}),
    reduxFirestore(fbConfig)
  )
);

store.firebaseAuthIsReady.then(()=>{

  ReactDOM.render(
    <div>
      <Online>
    
         <Provider store={store}><App /></Provider>   
      </Online>
      <Offline>
        <Off />
    </Offline>
  </div>
  
  
  , document.getElementById('root'));
})

