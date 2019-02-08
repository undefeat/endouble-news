import React from 'react';
import PropTypes from 'prop-types';
import formatDate from '../../helpers/formatDate';
import './index.css';

function ArticleMeta(props) {
    const { url, source, publishedAt } = props;

    return (
        <div className="article-meta">
            <a
                className="article-meta__source-link"
                href={url}
                rel="noopener noreferrer"
                aria-label="Source URL"
                target="_blank"
            >
                {source}
            </a>
            <span className="article-meta__delimiter">|</span>
            <time className="article-meta__date" dateTime={publishedAt} title={new Date(publishedAt).toLocaleString()}>
                {formatDate(publishedAt)}
            </time>
        </div>
    );
}

ArticleMeta.propTypes = {
    source: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
    publishedAt: PropTypes.string.isRequired,
};

export default ArticleMeta;
