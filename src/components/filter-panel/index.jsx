import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';
import './index.css';

class FilterPanel extends React.Component {
    searchInputRef = React.createRef();

    constructor(props) {
        super(props);
        this.state = {
            q: props.q,
        };
        this.callOnSearchPhraseChanged = debounce(this.callOnSearchPhraseChanged, 500);
    }

    componentDidMount() {
        if (this.searchInputRef.current) {
            this.searchInputRef.current.focus();
        }
    }

    handleCategoryChange = (event) => {
        const { onCategoryChanged } = this.props;
        onCategoryChanged(event.target.value);
    };

    handleSearchPhraseChange = (event) => {
        const q = event.target.value;
        this.setState({ q });
        this.callOnSearchPhraseChanged(q);
    };

    callOnSearchPhraseChanged = (q) => {
        const { onSearchPhraseChanged } = this.props;
        onSearchPhraseChanged(q);
    };

    handleCountryChange = (event) => {
        const { onCountryChanged } = this.props;
        onCountryChanged(event.target.value);
    };

    render() {
        const { categories, countries, selectedCategory, selectedCountry } = this.props;
        const { q } = this.state;

        const categoryOptions = categories.map(category => (
            <option key={category} value={category}>
                {category}
            </option>
        ));
        const countryOptions = countries.map(country => (
            <option key={country.code} value={country.code}>
                {country.nativeName}
            </option>
        ));

        return (
            <div className="filter-panel">
                <input
                    ref={this.searchInputRef}
                    className="filter-panel__input"
                    type="search"
                    aria-label="Keywords or a phrase to search for"
                    placeholder="Search..."
                    value={q}
                    onChange={this.handleSearchPhraseChange}
                />

                <label htmlFor="country-select" className="filter-panel__label">
                    <span>Country:</span>
                    <select
                        className="filter-panel__select"
                        id="country-select"
                        value={selectedCountry}
                        onChange={this.handleCountryChange}
                    >
                        {countryOptions}
                    </select>
                </label>

                <label htmlFor="category-select" className="filter-panel__label">
                    <span>Category:</span>
                    <select
                        className="filter-panel__select"
                        id="category-select"
                        value={selectedCategory}
                        onChange={this.handleCategoryChange}
                    >
                        {categoryOptions}
                    </select>
                </label>
            </div>
        );
    }
}

FilterPanel.propTypes = {
    q: PropTypes.string.isRequired,
    selectedCategory: PropTypes.string.isRequired,
    selectedCountry: PropTypes.string.isRequired,
    categories: PropTypes.arrayOf(PropTypes.string).isRequired,
    countries: PropTypes.arrayOf(
        PropTypes.shape({
            code: PropTypes.string,
            name: PropTypes.string,
            nativeName: PropTypes.string,
        }),
    ).isRequired,
    onCategoryChanged: PropTypes.func.isRequired,
    onCountryChanged: PropTypes.func.isRequired,
    onSearchPhraseChanged: PropTypes.func.isRequired,
};

export default FilterPanel;
