import React from 'react';
import { articleShape } from '../shapes';
import ArticleModal from '../article-modal';

class ArticleCard extends React.Component {
    state = {
        modalIsOpen: false,
    };

    handleClick = () => {
        this.setState({ modalIsOpen: true });
    };

    handleModalClosed = () => {
        this.setState({ modalIsOpen: false });
    };

    render() {
        const { article } = this.props;
        const { modalIsOpen } = this.state;
        const { source, title, description, url, urlToImage, publishedAt } = article;

        return (
            <li>
                <article>
                    <button type="button" onClick={this.handleClick}>
                        <figure>
                            <img src={urlToImage} alt="thumbnail" style={{ maxWidth: 100 }} />
                        </figure>
                        <h2>{title}</h2>
                        <p>{description}</p>
                    </button>

                    <p>
                        <span>Source: </span>
                        <a href={url} rel="noopener noreferrer" target="_blank">
                            {source}
                        </a>
                    </p>
                    <p>{publishedAt}</p>
                </article>

                {modalIsOpen && <ArticleModal article={article} onModalClosed={this.handleModalClosed} />}
            </li>
        );
    }
}

ArticleCard.propTypes = {
    article: articleShape.isRequired,
};

export default ArticleCard;
