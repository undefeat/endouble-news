import React from 'react';
import ReactDOM from 'react-dom';
import 'normalize.css';
import './styles.css';
import App from './components/app';
import ErrorBoundary from './components/error-boundary';

ReactDOM.render(
    <ErrorBoundary>
        <App />
    </ErrorBoundary>,
    document.getElementById('root'),
);
