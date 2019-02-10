import React from 'react';
import { throttle } from 'lodash';
import './index.css';

class BackToTop extends React.PureComponent {
    constructor(props) {
        super(props);
        this.updateVisibility = throttle(this.updateVisibility, 100);
    }

    state = { hidden: true };

    /* istanbul ignore next: need a real browser environment */
    componentDidMount() {
        window.addEventListener('scroll', this.updateVisibility);
        window.addEventListener('resize', this.updateVisibility);
    }

    /* istanbul ignore next: need a real browser environment */
    componentWillUnmount() {
        window.removeEventListener('scroll', this.updateVisibility);
        window.removeEventListener('resize', this.updateVisibility);
    }

    updateVisibility = () => {
        /* istanbul ignore next: need a real browser environment */
        if (document.documentElement.scrollTop > 0) {
            this.setState({ hidden: false });
        } else {
            this.setState({ hidden: true });
        }
    };

    handleClick = () => {
        /* istanbul ignore next: need a real browser environment */
        document.documentElement.scrollTop = 0;
    };

    render() {
        const { hidden } = this.state;

        return (
            <button
                type="button"
                className="back-to-top"
                hidden={hidden}
                aria-label="Back to Top"
                title="Back to Top"
                onClick={this.handleClick}
            >
                <i className="fas fa-arrow-up" />
            </button>
        );
    }
}

export default BackToTop;
