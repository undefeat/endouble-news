import ErrorWrapped from '../classes/ErrorWrapped';

/**
 * Singleton for working with newsapi.org API.
 *
 * @class HeadlineService
 */
class HeadlineService {
    apiUrl = 'https://newsapi.org/v2/top-headlines';

    apiKey = 'f009954168594c588df8766cb8f655a5';

    errorMessage = "Couldn't fetch headlines.";

    /**
     * Fetches latest news headlines.
     *
     * @param {object} filter an object containing key-value pairs that correspond to the request query.
     * @returns a Promise that resolves to an object containing number of total results and an array of articles.
     * @throws when the request or mapping of the response fails.
     * @memberof HeadlineService
     */
    async getHeadlines(filter) {
        try {
            const headers = new Headers({
                'X-Api-Key': this.apiKey,
            });
            const query = this.getQueryString(filter);
            const response = await fetch(this.apiUrl + query, {
                headers,
            });
            const body = await response.json();
            if (body.status === 'ok') {
                const articles = body.articles.map(article => ({
                    source: article.source.name,
                    author: article.author,
                    title: article.title,
                    description: article.description,
                    url: article.url,
                    urlToImage: article.urlToImage,
                    publishedAt: article.publishedAt,
                    content: article.content,
                }));

                return {
                    articles,
                    totalResults: body.totalResults,
                };
            }

            throw body;
        } catch (e) {
            throw new ErrorWrapped(this.errorMessage, e);
        }
    }

    /**
     * Stringifies the given object into a URL query.
     *
     * @memberof HeadlineService
     */
    getQueryString = (filter) => {
        if (!filter) {
            return '';
        }

        const strings = [];
        const entries = Object.entries(filter);

        for (let i = 0; i < entries.length; i += 1) {
            const [key, value] = entries[i];
            strings.push(`${key}=${value}`);
        }

        if (strings.length > 0) {
            return `?${strings.join('&')}`;
        }

        return '';
    }

    /**
     * Stringifies the given filter object into a URL query and pushes it to the history.
     *
     * @memberof HeadlineService
     */
    saveFilterToHistory = (filter) => {
        const query = this.getQueryString(filter);
        window.history.pushState(filter, null, query);
    };

    /**
     * Reads window location and parses the URL query to a filter object.
     *
     * @memberof HeadlineService
     */
    getFilterFromQuery = () => {
        const query = window.location.search;
        const paramStr = query.split('?')[1];
        if (paramStr) {
            const paramPairs = paramStr.split('&');
            const paramObj = {};
            for (let i = 0; i < paramPairs.length; i += 1) {
                const [key, value] = paramPairs[i].split('=');
                if (value && !Number.isNaN(Number(value))) {
                    paramObj[key] = Number(value);
                } else {
                    paramObj[key] = value;
                }
            }
            return paramObj;
        }

        return {};
    };
}

export default new HeadlineService();
