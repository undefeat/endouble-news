import React from 'react';
import PropTypes from 'prop-types';
import { articleShape } from '../shapes';
import Modal from '../modal';

function ArticleModal(props) {
    const { article, close } = props;
    const { source, author, title, url, urlToImage, publishedAt, content } = article;

    return (
        <Modal close={close}>
            <article>
                <figure>
                    <img src={urlToImage} alt="" style={{ maxWidth: '100%' }} />
                </figure>

                <h2>{title}</h2>

                <h6>
                    <span>Source: </span>
                    <a href={url} rel="noopener noreferrer" aria-label="Source URL" target="_blank">
                        {source}
                    </a>
                </h6>

                <time dateTime={publishedAt}>{publishedAt}</time>

                <h6>{author}</h6>

                <p>{content}</p>
            </article>
        </Modal>
    );
}

ArticleModal.propTypes = {
    article: articleShape.isRequired,
    close: PropTypes.func.isRequired,
};

export default ArticleModal;
