import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

class Modal extends React.Component {
    el = document.createElement('div');

    closeBtnRef = React.createRef();

    componentDidMount() {
        document.body.appendChild(this.el);
        document.body.addEventListener('click', this.handleOutsideClick);
        if (this.closeBtnRef.current) {
            this.closeBtnRef.current.focus();
        }
    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
        document.body.removeEventListener('click', this.handleOutsideClick);
    }

    handleOutsideClick = (event) => {
        if (event.target !== this.el && !this.el.contains(event.target)) {
            const { close } = this.props;
            close();
        }
    };

    render() {
        const { children, close } = this.props;

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
                <button ref={this.closeBtnRef} type="button" aria-label="Close" onClick={close}>
                    X
                </button>
                {children}
            </aside>,
            this.el,
        );
    }
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    close: PropTypes.func.isRequired,
};

export default Modal;
