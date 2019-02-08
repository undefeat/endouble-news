import React from 'react';
import PropTypes from 'prop-types';
import { articleShape } from '../shapes';
import Modal from '../modal';

function ArticleModal(props) {
    const { article, onModalClosed } = props;
    const { source, author, title, url, urlToImage, publishedAt, content } = article;

    return (
        <Modal onOutsideClick={onModalClosed}>
            <article>
                <figure>
                    <img src={urlToImage} alt="thumbnail" style={{ maxWidth: '100%' }} />
                </figure>
                <h2>{title}</h2>
                <p>{publishedAt}</p>
                <p>{author}</p>
                <p>{content}</p>
                <p>
                    <span>Source: </span>
                    <a href={url} rel="noopener noreferrer" target="_blank">
                        {source}
                    </a>
                </p>
            </article>
        </Modal>
    );
}

ArticleModal.propTypes = {
    article: articleShape.isRequired,
    onModalClosed: PropTypes.func.isRequired,
};

export default ArticleModal;
