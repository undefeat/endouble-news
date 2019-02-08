import React from 'react';
import CountryService from '../../services/CountryService';
import HeadlineService from '../../services/HeadlineService';
import FilterPanel from '../filter-panel';
import SortPanel from '../sort-panel';
import ArticleList from '../article-list';
import Footer from '../footer';

class App extends React.Component {
    state = {
        articles: [],
        categories: ['business', 'entertainment', 'general', 'health', 'science', 'sports', 'technology'],
        countries: [],
        filter: {
            country: 'us',
            category: 'general',
            q: '',
            pageSize: 12,
            page: 1,
        },
        loading: false,
        totalResults: 0,
    };

    async componentDidMount() {
        try {
            this.setState({ loading: true });

            const countries = await CountryService.getCountries();

            const { filter } = this.state;
            const { articles, totalResults } = await HeadlineService.getHeadlines(filter);

            this.setState({ articles, countries, loading: false, totalResults });
        } catch (e) {
            this.setState(() => {
                throw e;
            });
        }
    }

    updateFilter = (filterPartial) => {
        this.setState(prevState => ({
            filter: {
                ...prevState.filter,
                ...filterPartial,
            },
        }));
    };

    render() {
        const { articles, categories, countries, filter, totalResults } = this.state;

        return (
            <>
                <header>
                    <FilterPanel
                        q={filter.q}
                        selectedCategory={filter.category}
                        selectedCountry={filter.country}
                        categories={categories}
                        countries={countries}
                        onCategoryChanged={category => this.updateFilter({ category })}
                        onCountryChanged={country => this.updateFilter({ country })}
                        onSearchPhraseChanged={q => this.updateFilter({ q })}
                    />
                    <SortPanel />
                </header>

                <ArticleList articles={articles} totalResults={totalResults} />
                <Footer />
            </>
        );
    }
}

export default App;
