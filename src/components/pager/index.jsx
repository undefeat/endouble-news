import React from 'react';
import PropTypes from 'prop-types';

function Pager(props) {
    const { totalResults, pageSize, page, onPageChanged } = props;
    const totalPages = Math.ceil(totalResults / pageSize);
    const hasPrev = page > 1;
    const hasNext = page < totalPages;
    const handlePrevClick = () => onPageChanged(page - 1);
    const handleNextClick = () => onPageChanged(page + 1);

    return (
        <nav>
            <ul>
                <li>
                    <button
                        type="button"
                        aria-label="Previous page"
                        disabled={!hasPrev}
                        onClick={() => (hasPrev ? handlePrevClick() : null)}
                    >
                        Prev
                    </button>
                </li>
                <li>
                    <button
                        type="button"
                        aria-label="Next page"
                        disabled={!hasNext}
                        onClick={() => (hasNext ? handleNextClick() : null)}
                    >
                        Next
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
