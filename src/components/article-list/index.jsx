import React from 'react';
import PropTypes from 'prop-types';
import ArticleCard, { articleShape } from '../article-card';

function ArticleList(props) {
    const { articles, totalResults } = props;

    const cards = articles.map(article => <ArticleCard key={`${article.title}__${article.url}`} article={article} />);

    return (
        <main>
            <ul>{cards}</ul>
        </main>
    );
}

ArticleList.propTypes = {
    articles: PropTypes.arrayOf(articleShape).isRequired,
    totalResults: PropTypes.number.isRequired,
};

export default ArticleList;
