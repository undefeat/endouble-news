import React from 'react';
import PropTypes from 'prop-types';
import articleShape from '../shapes/articleShape';
import Modal from '../modal';
import ArticleMeta from '../article-meta';
import './index.css';

function ArticleModal(props) {
    const { article, close } = props;
    const { source, author, title, url, urlToImage, publishedAt, content, description } = article;

    return (
        <Modal close={close}>
            <article className="article-modal">
                <figure className="article-modal__picture">
                    <img className="article-modal__picture__img" src={urlToImage} alt="" />
                </figure>

                <h2 className="article-modal__title">{title}</h2>

                <ArticleMeta source={source} url={url} publishedAt={publishedAt} />

                <p className="article-modal__content">{content || description}</p>

                <h6 className="article-modal__author">{author}</h6>
            </article>
        </Modal>
    );
}

ArticleModal.propTypes = {
    article: articleShape.isRequired,
    close: PropTypes.func.isRequired,
};

export default ArticleModal;
