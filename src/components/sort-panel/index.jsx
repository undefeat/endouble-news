import React from 'react';
import PropTypes from 'prop-types';
import './index.css';

function SortPanel(props) {
    const { sortBy, sortOptions, onSortByChanged } = props;
    const nextSortOption = sortOptions.find(sortOption => sortOption !== sortBy);
    const handleClick = () => onSortByChanged(nextSortOption);

    return (
        <div className="sort-panel">
            <button className="sort-panel__btn" type="button" onClick={handleClick}>
                <span>Sort by </span>
                <span>{nextSortOption}</span>
            </button>
        </div>
    );
}

SortPanel.propTypes = {
    sortBy: PropTypes.string.isRequired,
    sortOptions: PropTypes.arrayOf(PropTypes.string).isRequired,
    onSortByChanged: PropTypes.func.isRequired,
};

export default SortPanel;
