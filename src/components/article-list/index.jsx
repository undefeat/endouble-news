import React from 'react';
import PropTypes from 'prop-types';
import { articleShape } from '../shapes';
import ArticleCard from '../article-card';
import Pager from '../pager';

function ArticleList(props) {
    const { articles, totalResults, pageSize, page, onPageChanged } = props;

    const cards = articles.map(article => <ArticleCard key={`${article.title}__${article.url}`} article={article} />);

    return (
        <main>
            <ul>{cards}</ul>

            <Pager totalResults={totalResults} pageSize={pageSize} page={page} onPageChanged={onPageChanged} />
        </main>
    );
}

ArticleList.propTypes = {
    articles: PropTypes.arrayOf(articleShape).isRequired,
    totalResults: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onPageChanged: PropTypes.func.isRequired,
};

export default ArticleList;
