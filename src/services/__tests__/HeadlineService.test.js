import HeadlineService from '../HeadlineService';

const topHeadlines = require('./responses/top-headlines.json');
const topHeadlinesError = require('./responses/top-headlines-error.json');

describe('getHeadlines', () => {
    beforeEach(() => fetch.resetMocks());

    it('should correctly map the response body', async () => {
        expect.assertions(162);
        fetch.mockResponseOnce(JSON.stringify(topHeadlines));

        const {
            articles,
            totalResults,
        } = await HeadlineService.getHeadlines();

        expect(totalResults).toBe(36);
        expect(articles).toHaveLength(20);
        articles.forEach((article) => {
            const keys = Object.keys(article);
            expect(keys).toContain('source');
            expect(keys).toContain('author');
            expect(keys).toContain('title');
            expect(keys).toContain('description');
            expect(keys).toContain('url');
            expect(keys).toContain('urlToImage');
            expect(keys).toContain('publishedAt');
            expect(keys).toContain('content');
        });
    });

    it('should throw when empty response', async () => {
        expect.assertions(1);
        try {
            await HeadlineService.getHeadlines();
        } catch (e) {
            expect(e.message).toEqual(HeadlineService.errorMessage);
        }
    });

    it('should throw when status not ok', async () => {
        expect.assertions(1);
        fetch.mockResponseOnce(JSON.stringify(topHeadlinesError));
        try {
            await HeadlineService.getHeadlines();
        } catch (e) {
            expect(e.message).toEqual(HeadlineService.errorMessage);
        }
    });
});

describe('getQueryString', () => {
    it('should return empty string when no filter', () => {
        expect(HeadlineService.getQueryString()).toBe('');
    });

    it('should include filter param when it is truthy', () => {
        expect(HeadlineService.getQueryString({
            country: 'us',
        })).toBe('?country=us');

        expect(HeadlineService.getQueryString({
            category: 'entertainment',
        })).toBe('?category=entertainment');

        expect(HeadlineService.getQueryString({
            q: 'test',
        })).toBe('?q=test');

        expect(HeadlineService.getQueryString({
            pageSize: 12,
        })).toBe('?pageSize=12');

        expect(HeadlineService.getQueryString({
            page: 2,
        })).toBe('?page=2');

        expect(HeadlineService.getQueryString({
            country: 'us',
            category: 'entertainment',
            q: 'test',
            pageSize: 12,
            page: 1,
        })).toBe('?country=us&category=entertainment&q=test&pageSize=12&page=1');
    });
});
