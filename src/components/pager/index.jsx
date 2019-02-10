import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function Pager(props) {
    const { totalResults, pageSize, page, onPageChanged } = props;
    const totalPages = Math.ceil(totalResults / pageSize);
    const hasPrev = page > 1;
    const hasNext = page < totalPages;
    const handlePrevClick = () => onPageChanged(page - 1);
    const handleNextClick = () => onPageChanged(page + 1);

    return (
        <nav className="pager">
            <ul>
                <li>
                    <button
                        className="pager__btn pager__btn--prev"
                        type="button"
                        aria-label="Previous page"
                        title="Next page"
                        disabled={!hasPrev}
                        onClick={() => (hasPrev ? handlePrevClick() : null)}
                    >
                        <i className="fas fa-arrow-left" />
                    </button>
                </li>
                <li>
                    <button
                        className="pager__btn pager__btn--next"
                        type="button"
                        aria-label="Next page"
                        title="Next page"
                        disabled={!hasNext}
                        onClick={() => (hasNext ? handleNextClick() : null)}
                    >
                        <i className="fas fa-arrow-right" />
                    </button>
                </li>
            </ul>
        </nav>
    );
}

Pager.propTypes = {
    totalResults: PropTypes.number.isRequired,
    pageSize: PropTypes.number.isRequired,
    page: PropTypes.number.isRequired,
    onPageChanged: PropTypes.func.isRequired,
};

export default Pager;
