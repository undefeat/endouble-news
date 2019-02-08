const topHeadlines = require('./__tests__/responses/top-headlines.json');

class HeadlineService {
    apiUrl = 'https://newsapi.org/v2/top-headlines';

    apiKey = 'f009954168594c588df8766cb8f655a5';

    errorMessage = "Couldn't fetch headlines.";

    async getHeadlines(filter) {
        try {
            // const headers = new Headers({
            //     'X-Api-Key': this.apiKey,
            // });
            // const query = this.getQueryString(filter);
            // const response = await fetch(this.apiUrl + query, {
            //     headers,
            // });
            // const body = await response.json();
            const body = topHeadlines;
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
            throw Error(this.errorMessage);
        }
    }

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
}

export default new HeadlineService();
