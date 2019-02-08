import React from 'react';
import './index.css';

class Loader extends React.PureComponent {
    state = { mounted: false };

    componentDidMount() {
        this.animationFrameRequest = window.requestAnimationFrame(() => {
            this.setState({ mounted: true });
        });
    }

    componentWillUnmount() {
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
