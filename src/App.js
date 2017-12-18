import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from './root.store';
import TransitWhen from './TransitWhen';

// For allowing XHR requests to show in the Network tab in Chrome DevTools =)
// IMPORTANT remove following line when running tests
GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest;

const store = configureStore();

const App = () => (
    <Provider store={store}>
        <TransitWhen />
    </Provider>
);

export default App;
