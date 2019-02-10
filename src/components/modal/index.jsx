import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import './index.css';

class Modal extends React.Component {
    el = document.createElement('div');

    closeBtnRef = React.createRef();

    modalRef = React.createRef();

    componentDidMount() {
        document.body.appendChild(this.el);
        document.body.addEventListener('click', this.handleOutsideClick);
        /* istanbul ignore next: not critical */
        if (this.closeBtnRef.current) {
            this.closeBtnRef.current.focus();
        }
    }

    componentWillUnmount() {
        document.body.removeChild(this.el);
        document.body.removeEventListener('click', this.handleOutsideClick);
    }

    handleOutsideClick = (event) => {
        /* istanbul ignore next: need a real browser environment */
        if (
            this.modalRef.current
            && event.target !== this.modalRef.current
            && !this.modalRef.current.contains(event.target)
        ) {
            const { close } = this.props;
            close();
        }
    };

    render() {
        const { children, close } = this.props;

        return ReactDOM.createPortal(
            <div className="modal__wrapper">
                <aside ref={this.modalRef} className="modal">
                    <button
                        ref={this.closeBtnRef}
                        className="modal__close-btn"
                        type="button"
                        aria-label="Close"
                        title="Close"
                        onClick={close}
                    >
                        <i className="fas fa-times" />
                    </button>
                    {children}
                </aside>
            </div>,
            this.el,
        );
    }
}

Modal.propTypes = {
    children: PropTypes.element.isRequired,
    close: PropTypes.func.isRequired,
};

export default Modal;
