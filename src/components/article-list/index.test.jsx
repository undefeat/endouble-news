import React from 'react';
import shallow from 'react-test-renderer/shallow';
import ArticleList from '.';

const articles = [
    {
        source: 'Ars Technica',
        author: 'Sean Gallagher',
        title: 'Google releases Chrome extension that alerts to breached passwords - Ars Technica',
        description: 'Using hashed and encrypted store, add-on securely checks logins against breach database.',
        url:
            'https://arstechnica.com/information-technology/2019/02/google-releases-chrome-extension-that-alerts-to-breached-passwords/',
        urlToImage: 'https://cdn.arstechnica.net/wp-content/uploads/2019/02/passwordcheck-760x380.jpg',
        publishedAt: '2019-02-05T14:54:00Z',
        content:
            "Enlarge / Good news. For now. 23 with 21 posters participating With lists of billions of compromised credentials floating around on underground forums and in text-paste pages across the Internet, it's difficult for anyone to keep up with the potential threat … [+2566 chars]",
    },
    {
        source: 'CNBC',
        author: 'Lauren Feiner',
        title: "Apple's smart speaker is struggling against rivals from Amazon and Google - CNBC",
        description:
            "Apple's HomePod, which is more expensive and limited than its competitors, only makes up 6 percent of the U.S. installed base of smart speaker devices, a new analysis found.",
        url: 'https://www.cnbc.com/2019/02/05/apple-homepod-smart-speaker-market-share.html',
        urlToImage:
            'https://fm.cnbc.com/applications/cnbc.com/resources/img/editorial/2017/06/05/104511324-GettyImages-692676170.1910x1000.jpg',
        publishedAt: '2019-02-05T14:06:38Z',
        content:
            "Apple's smart speaker is struggling to grab market share from the Amazon Echo and Google Home. A new analysis by Consumer Intelligence Research Partners (CIRP) found Apple's HomePod makes up only 6 percent of the 66 million units that make up the U.S. install… [+2160 chars]",
    },
];

describe('ArticleList', () => {
    it('should render Loader when fetching', () => {
        const tree = shallow
            .createRenderer()
            .render(
                <ArticleList
                    fetching
                    articles={articles}
                    totalResults={37}
                    pageSize={12}
                    page={1}
                    onPageChanged={() => {}}
                />,
            );

        expect(tree).toMatchSnapshot();
    });

    it('should render "No articles found" when 0 articles', () => {
        const tree = shallow
            .createRenderer()
            .render(
                <ArticleList
                    fetching={false}
                    articles={[]}
                    totalResults={37}
                    pageSize={12}
                    page={1}
                    onPageChanged={() => {}}
                />,
            );

        expect(tree).toMatchSnapshot();
    });

    it('should render cards with a pager when some articles', () => {
        const tree = shallow
            .createRenderer()
            .render(
                <ArticleList
                    fetching={false}
                    articles={articles}
                    totalResults={37}
                    pageSize={12}
                    page={1}
                    onPageChanged={() => {}}
                />,
            );

        expect(tree).toMatchSnapshot();
    });
});
