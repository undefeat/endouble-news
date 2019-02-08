import React from 'react';
import { articleShape } from '../shapes';
import ArticleModal from '../article-modal';

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
            <li>
                <article>
                    <button
                        ref={this.openModalBtnRef}
                        type="button"
                        aria-label="Open in modal"
                        onClick={this.handleClick}
                    >
                        <figure>
                            <img src={urlToImage} alt="thumbnail" style={{ maxWidth: 100 }} />
                        </figure>
                        <h2>{title}</h2>
                    </button>

                    <p>{description}</p>

                    <h6>
                        <span>Source: </span>
                        <a href={url} rel="noopener noreferrer" aria-label="Source URL" target="_blank">
                            {source}
                        </a>
                    </h6>

                    <time dateTime={publishedAt}>{publishedAt}</time>
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
