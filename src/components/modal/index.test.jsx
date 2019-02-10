import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import shallow from 'react-test-renderer/shallow';
import Modal from '.';

describe('Modal', () => {
    it('should correctly render', () => {
        const tree = shallow.createRenderer().render(
            <Modal close={() => {}}>
                <h2>Hello, World!</h2>
            </Modal>,
        );

        expect(tree).toMatchSnapshot();
    });

    it('should call "close" when close btn is clicked', () => {
        const close = jest.fn();
        const element = ReactTestUtils.renderIntoDocument(
            <Modal close={close}>
                <h2>Hello, World!</h2>
            </Modal>,
        );

        const closeButton = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'modal__close-btn');
        ReactTestUtils.Simulate.click(closeButton);
        expect(close).toHaveBeenCalledTimes(1);
    });
});
