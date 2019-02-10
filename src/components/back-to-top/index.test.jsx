import React from 'react';
import shallow from 'react-test-renderer/shallow';
import BackToTop from '.';

describe('BackToTop', () => {
    it('should correctly render', () => {
        const tree = shallow.createRenderer().render(<BackToTop />);

        expect(tree).toMatchSnapshot();
    });
});
