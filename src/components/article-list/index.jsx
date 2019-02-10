import React from 'react';
import PropTypes from 'prop-types';
import articleShape from '../shapes/articleShape';
import ArticleCard from '../article-card';
import Pager from '../pager';
import Loader from '../loader';
import './index.css';

function ArticleList(props) {
    const { fetching, articles, totalResults, pageSize, page, onPageChanged } = props;

    if (fetching) {
        return (
            <main className="article-list__wrapper fetching">
                <Loader />
            </main>
        );
    }

    const cards = articles.map(article => <ArticleCard key={`${article.title}__${article.url}`} article={article} />);

    return (
        <main className="article-list__wrapper">
            {cards.length > 0 ? (
                <>
                    <ul className="article_list">{cards}</ul>

                    <Pager totalResults={totalResults} pageSize={pageSize} page={page} onPageChanged={onPageChanged} />
                </>
            ) : (
                <h2 className="no-articles-found">Sorry, no articles found that match your query.</h2>
            )}
        </main>
    );
}

ArticleList.propTypes = {
    fetching: PropTypes.bool.isRequired,
    articles: PropTypes.arrayOf(articleShape).isRequired,
    totalResults: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onPageChanged: PropTypes.func.isRequired,
};

export default ArticleList;
