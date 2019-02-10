import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import shallow from 'react-test-renderer/shallow';
import FilterPanel from '.';

const countries = [
    { code: 'us', name: 'United State', nativeName: 'United States of America' },
    { code: 'nl', name: 'Netherlands', nativeName: 'Nederland' },
    { code: 'uk', name: 'United Kingdom', nativeName: 'United Kingdom' },
];
const categories = ['general', 'sports', 'buisness'];

describe('FilterPanel', () => {
    it('should correctly render', () => {
        const tree = shallow
            .createRenderer()
            .render(
                <FilterPanel
                    q="test"
                    selectedCategory="sports"
                    selectedCountry="nl"
                    categories={categories}
                    countries={countries}
                    onCategoryChanged={() => {}}
                    onCountryChanged={() => {}}
                    onSearchPhraseChanged={() => {}}
                />,
            );

        expect(tree).toMatchSnapshot();
    });

    it('should call change callbacks when input changes', () => {
        const onCategoryChanged = jest.fn();
        const onCountryChanged = jest.fn();
        const onSearchPhraseChanged = jest.fn();
        const categoryChangeEvent = { target: { value: 'new category value' } };
        const countryChangeEvent = { target: { value: 'new country value' } };

        const element = ReactTestUtils.renderIntoDocument(
            <FilterPanel
                q="test"
                selectedCategory="sports"
                selectedCountry="nl"
                categories={categories}
                countries={countries}
                onCategoryChanged={onCategoryChanged}
                onCountryChanged={onCountryChanged}
                onSearchPhraseChanged={onSearchPhraseChanged}
            />,
        );

        const searchInput = ReactTestUtils.findRenderedDOMComponentWithClass(element, 'filter-panel__input');
        const countrySelect = ReactTestUtils.findRenderedDOMComponentWithClass(
            element,
            'filter-panel__select--country',
        );
        const categorySelect = ReactTestUtils.findRenderedDOMComponentWithClass(
            element,
            'filter-panel__select--category',
        );

        ReactTestUtils.Simulate.change(searchInput);
        expect(onSearchPhraseChanged).not.toHaveBeenCalled(); // Because we use debounce.

        ReactTestUtils.Simulate.change(countrySelect, countryChangeEvent);
        expect(onCountryChanged).toHaveBeenCalledTimes(1);
        expect(onCountryChanged).toHaveBeenCalledWith(countryChangeEvent.target.value);

        ReactTestUtils.Simulate.change(categorySelect, categoryChangeEvent);
        expect(onCategoryChanged).toHaveBeenCalledTimes(1);
        expect(onCategoryChanged).toHaveBeenCalledWith(categoryChangeEvent.target.value);
    });
});
