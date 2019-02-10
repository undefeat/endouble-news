import React from 'react';
import shallow from 'react-test-renderer/shallow';
import Footer from '.';

describe('Footer', () => {
    it('should correctly render', () => {
        const tree = shallow.createRenderer().render(<Footer />);

        expect(tree).toMatchSnapshot();
    });
});
