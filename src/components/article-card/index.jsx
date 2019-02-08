import React from 'react';
import PropTypes from 'prop-types';

function ArticleCard(props) {
    const { article } = props;
    const { source, author, title, description, url, urlToImage, publishedAt, content } = article;

    return (
        <li>
            <article>
                <figure>
                    <img src={urlToImage} alt="thumbnail" style={{ maxWidth: 100 }} />
                </figure>
                <h2>{title}</h2>
                <p>{description}</p>
                <p>
                    <span>Source: </span>
                    <a href={url} rel="noopener noreferrer" target="_blank">
                        {source}
                    </a>
                </p>
                <p>{publishedAt}</p>
            </article>
        </li>
    );
}

export const articleShape = PropTypes.shape({
    source: PropTypes.string,
    author: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    urlToImage: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    publishedAt: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
});

ArticleCard.propTypes = {
    article: articleShape.isRequired,
};

export default ArticleCard;
