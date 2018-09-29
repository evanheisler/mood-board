import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker'; // eslint-disable-line no-unused-vars

ReactDOM.render(<App />, document.getElementById('root'));
// Enable after dev for caching
// registerServiceWorker();
