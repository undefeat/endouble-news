import React from 'react';
import './index.css';

class Loader extends React.PureComponent {
    state = { mounted: false };

    /* istanbul ignore next: not critical, hard to test */
    componentDidMount() {
        /* istanbul ignore next: not critical, hard to test */
        this.animationFrameRequest = window.requestAnimationFrame(() => {
            this.setState({ mounted: true });
        });
    }

    /* istanbul ignore next: not critical, hard to test */
    componentWillUnmount() {
        /* istanbul ignore next: not critical, hard to test */
        window.cancelAnimationFrame(this.animationFrameRequest);
    }

    render() {
        const { mounted } = this.state;

        return (
            <div className={`loader${mounted ? '' : ' hidden'}`}>
                <div className="lds-ring">
                    <div />
                    <div />
                    <div />
                    <div />
                </div>
            </div>
        );
    }
}

export default Loader;
