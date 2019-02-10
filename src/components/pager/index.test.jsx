import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import shallow from 'react-test-renderer/shallow';
import Pager from './index';

// eslint-disable-next-line
class PagerWrapped extends React.Component {
    // eslint-disable-next-line
    render() {
        return <Pager {...this.props} />;
    }
}

describe('Pager', () => {
    it('should correctly render', () => {
        const tree = shallow
            .createRenderer()
            .render(<Pager totalResults={37} pageSize={8} page={2} onPageChanged={() => {}} />);

        expect(tree).toMatchSnapshot();
    });

    it('should call "onPageChanged" when clicking prev or next', () => {
        const onPageChanged = jest.fn();
        const element = ReactTestUtils.renderIntoDocument(
            // ReactTestUtils don't render functional components.
            <PagerWrapped totalResults={37} pageSize={8} page={2} onPageChanged={onPageChanged} />,
        );

        const prevBtn = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'pager__btn--prev');
        const nextBtn = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'pager__btn--next');

        ReactTestUtils.Simulate.click(prevBtn);
        expect(onPageChanged).toHaveBeenCalledTimes(1);
        expect(onPageChanged).toHaveBeenCalledWith(1);

        onPageChanged.mockReset();
        ReactTestUtils.Simulate.click(nextBtn);
        expect(onPageChanged).toHaveBeenCalledTimes(1);
        expect(onPageChanged).toHaveBeenCalledWith(3);
    });

    it('should not call "onPageChanged" when prev or next are disabled', () => {
        const onPageChanged = jest.fn();
        const element = ReactTestUtils.renderIntoDocument(
            // ReactTestUtils don't render functional components.
            <PagerWrapped totalResults={0} pageSize={8} page={1} onPageChanged={onPageChanged} />,
        );

        const prevBtn = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'pager__btn--prev');
        const nextBtn = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'pager__btn--next');

        ReactTestUtils.Simulate.click(prevBtn);
        expect(onPageChanged).toHaveBeenCalledTimes(0);

        ReactTestUtils.Simulate.click(nextBtn);
        expect(onPageChanged).toHaveBeenCalledTimes(0);
    });
});
