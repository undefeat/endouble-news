import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Modal extends React.Component {
    el = document.createElement('div');

    componentDidMount() {
        document.body.appendChild(this.el);
        document.body.addEventListener('click', this.handleOutsideClick);
    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
        document.body.removeEventListener('click', this.handleOutsideClick);
    }

    handleOutsideClick = event => {
        if (event.target !== this.el && !this.el.contains(event.target)) {
            const { onOutsideClick } = this.props;
            onOutsideClick();
        }
    };

    render() {
        const { children } = this.props;

        return ReactDOM.createPortal(
            <aside
                style={{
                    position: 'fixed',
                    top: 0,
                    maxWidth: '80vw',
                    maxHeight: '80vh',
                    background: '#FFF',
                    border: '1px solid black',
                    overflow: 'auto',
                }}
            >
                {children}
            </aside>,
            this.el,
        );
    }
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    onOutsideClick: PropTypes.func.isRequired,
};

export default Modal;
