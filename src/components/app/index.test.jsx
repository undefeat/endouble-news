import React from 'react';
import shallow from 'react-test-renderer/shallow';
import App from '.';

describe('App', () => {
    it('should correctly render', () => {
        const tree = shallow.createRenderer().render(<App />);

        expect(tree).toMatchSnapshot();
    });
});
