import React from 'react';
import PropTypes from 'prop-types';

function FilterPanel(props) {
    const {
        q,
        categories,
        countries,
        selectedCategory,
        selectedCountry,
        onCategoryChanged,
        onCountryChanged,
        onSearchPhraseChanged,
    } = props;

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
    const handleCategoryChange = event => onCategoryChanged(event.target.value);
    const handleCountryChange = event => onCountryChanged(event.target.value);
    const handleSearchPhraseChange = event => onSearchPhraseChanged(event.target.value);

    return (
        <div>
            <input
                type="search"
                aria-label="Keywords or a phrase to search for"
                placeholder='Keywords or a phrase to search for, e.g. "elections"'
                value={q}
                onChange={handleSearchPhraseChange}
            />

            <label htmlFor="country-select">
                Country:
                <select id="country-select" value={selectedCountry} onChange={handleCountryChange}>
                    {countryOptions}
                </select>
            </label>

            <label htmlFor="category-select">
                Category:
                <select id="category-select" value={selectedCategory} onChange={handleCategoryChange}>
                    {categoryOptions}
                </select>
            </label>
        </div>
    );
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
