import React from 'react';
import shallow from 'react-test-renderer/shallow';
import ArticleMeta from '.';

describe('ArticleMeta', () => {
    it('should render Loader when fetching', () => {
        Date.now = jest.fn(() => 1549722223384);

        const tree = shallow
            .createRenderer()
            .render(
                <ArticleMeta
                    source="CNBC"
                    url="https://www.cnbc.com/2019/02/05/apple-homepod-smart-speaker-market-share.html"
                    publishedAt="2019-02-05T14:06:38Z"
                />,
            );

        expect(tree).toMatchSnapshot();
    });
});
