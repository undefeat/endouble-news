import React from 'react';
import PropTypes from 'prop-types';

class ErrorBoundary extends React.Component {
    static getDerivedStateFromError() {
        return { hasError: true };
    }

    state = {
        hasError: false,
    };

    render() {
        const { children } = this.props;
        const { hasError } = this.state;

        return hasError ? <h1>OOPS an Error Occurred</h1> : children;
    }
}

ErrorBoundary.propTypes = {
    children: PropTypes.element.isRequired,
};

export default ErrorBoundary;
