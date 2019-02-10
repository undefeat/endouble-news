import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import shallow from 'react-test-renderer/shallow';
import ArticleCard from '.';

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

describe('ArticleCard', () => {
    it('should correctly render', () => {
        const tree = shallow.createRenderer().render(<ArticleCard article={article} />);

        expect(tree).toMatchSnapshot();
    });

    it('should change "modalIsOpen" when buttons are clicked', () => {
        const element = ReactTestUtils.renderIntoDocument(<ArticleCard article={article} />);

        expect(element.state.modalIsOpen).toBe(false);
        const openButton = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'article-card__modal-btn');
        ReactTestUtils.Simulate.click(openButton);
        expect(element.state.modalIsOpen).toBe(true);

        const closeButton = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'modal__close-btn');
        ReactTestUtils.Simulate.click(closeButton);
        expect(element.state.modalIsOpen).toBe(false);
    });
});
