import React from 'react';
import articleShape from '../shapes/articleShape';
import ArticleModal from '../article-modal';
import ArticleMeta from '../article-meta';
import './index.css';

class ArticleCard extends React.Component {
    state = {
        modalIsOpen: false,
    };

    openModalBtnRef = React.createRef();

    handleClick = () => {
        this.setState({ modalIsOpen: true });
    };

    handleCloseModal = () => {
        this.setState({ modalIsOpen: false });
        if (this.openModalBtnRef.current) {
            this.openModalBtnRef.current.focus();
        }
    };

    render() {
        const { article } = this.props;
        const { modalIsOpen } = this.state;
        const { source, title, description, url, urlToImage, publishedAt } = article;

        return (
            <li className="article-card">
                <article>
                    <button
                        ref={this.openModalBtnRef}
                        className="article-card__modal-btn"
                        type="button"
                        aria-label="Open in modal"
                        onClick={this.handleClick}
                    >
                        <figure className="article-card__thumbnail">
                            <img className="article-card__thumbnail__img" src={urlToImage} alt="thumbnail" />
                        </figure>

                        <h2 className="article-card__title">{title}</h2>
                    </button>

                    <ArticleMeta source={source} url={url} publishedAt={publishedAt} />

                    <p className="article-card__description">{description}</p>
                </article>

                {modalIsOpen && <ArticleModal article={article} close={this.handleCloseModal} />}
            </li>
        );
    }
}

ArticleCard.propTypes = {
    article: articleShape.isRequired,
};

export default ArticleCard;
