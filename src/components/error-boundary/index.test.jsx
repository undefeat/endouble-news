import React from 'react';
import renderer from 'react-test-renderer';
import ErrorBoundary from '.';

describe('ErrorBoundary', () => {
    it('should render error message', () => {
        const ComponentWithError = () => {
            throw Error();
        };

        const tree = renderer.create(
            <ErrorBoundary>
                <ComponentWithError />
            </ErrorBoundary>,
        );

        expect(tree).toMatchSnapshot();
    });
});
