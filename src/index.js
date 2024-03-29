import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import Firebase, {FirebaseContext} from './utils/Firebase'
import {Provider} from "react-redux";
import store from './store'
ReactDOM.render(
    <Provider store={store}>
        <FirebaseContext.Provider value={new Firebase()}>
            <App />
        </FirebaseContext.Provider>
    </Provider>
    , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
