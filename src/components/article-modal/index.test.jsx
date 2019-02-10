import React from 'react';
import shallow from 'react-test-renderer/shallow';
import ArticleModal from '.';

const article = {
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
};

describe('ArticleModal', () => {
    it('should correctly render', () => {
        const tree = shallow.createRenderer().render(<ArticleModal article={article} close={() => {}} />);

        expect(tree).toMatchSnapshot();
    });
});
