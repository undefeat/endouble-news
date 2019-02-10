import React from 'react';
import shallow from 'react-test-renderer/shallow';
import Loader from '.';

describe('Loader', () => {
    it('should correctly render', () => {
        const tree = shallow.createRenderer().render(<Loader />);

        expect(tree).toMatchSnapshot();
    });
});
