import React from 'react';
import CountryService from '../../services/CountryService';
import HeadlineService from '../../services/HeadlineService';
import FilterPanel from '../filter-panel';
import SortPanel from '../sort-panel';
import ArticleList from '../article-list';
import Footer from '../footer';
import Loader from '../loader';
import BackToTop from '../back-to-top';
import './index.css';

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
            ...HeadlineService.getFilterFromQuery(),
        },
        sortOptions: ['date', 'source'],
        sortBy: 'date',
        loading: false,
        fetchingArticles: false,
        totalResults: 0,
    };

    async componentDidMount() {
        try {
            const cloak = document.getElementById('cloak');
            if (cloak) {
                cloak.style.display = 'none';
            }
            window.addEventListener('popstate', this.handlePopstate);

            const { filter } = this.state;
            this.setState({ loading: true });
            const countries = await CountryService.getCountries();
            this.setState({ countries });
            this.fetchArticles(filter);
            this.setState({ loading: false });
        } catch (e) {
            this.setState(() => {
                throw e;
            });
        }
    }

    async componentDidUpdate(prevProps, prevState) {
        const { filter } = this.state;
        if (filter !== prevState.filter) {
            this.fetchArticles(filter);
        }
    }

    componentWillUnmount() {
        window.removeEventListener('popstate', this.handlePopstate);
    }

    handlePopstate = (event) => {
        if (event.state) {
            this.updateFilter(event.state, false);
        }
    };

    updateFilter = (filterPartial, updateQueryParams = true) => {
        this.setState((prevState) => {
            const newFilter = {
                ...prevState.filter,
                ...filterPartial,
            };

            if (updateQueryParams) {
                HeadlineService.saveFilterToHistory(newFilter);
            }

            return {
                filter: newFilter,
            };
        });
    };

    updateSortBy = sortBy => this.setState({ sortBy });

    async fetchArticles(filter) {
        this.setState({ fetchingArticles: true });
        const { articles, totalResults } = await HeadlineService.getHeadlines(filter);
        this.setState({ articles, totalResults, fetchingArticles: false });
    }

    render() {
        const {
            articles,
            categories,
            countries,
            filter,
            sortBy,
            sortOptions,
            totalResults,
            loading,
            fetchingArticles,
        } = this.state;

        if (loading) {
            return <Loader />;
        }

        let articlesSorted;
        if (sortBy === 'source') {
            articlesSorted = [...articles].sort((a, b) => {
                if (a.source < b.source) {
                    return -1;
                }
                if (a.source > b.source) {
                    return 1;
                }
                return 0;
            });
        } else {
            articlesSorted = articles;
        }

        return (
            <>
                <div className="app">
                    <header className="app__header">
                        <FilterPanel
                            q={filter.q}
                            selectedCategory={filter.category}
                            selectedCountry={filter.country}
                            categories={categories}
                            countries={countries}
                            onCategoryChanged={category => this.updateFilter({ category, page: 1 })}
                            onCountryChanged={country => this.updateFilter({ country, page: 1 })}
                            onSearchPhraseChanged={q => this.updateFilter({ q, page: 1 })}
                        />
                        <SortPanel sortBy={sortBy} sortOptions={sortOptions} onSortByChanged={this.updateSortBy} />
                    </header>

                    <ArticleList
                        fetching={fetchingArticles}
                        articles={articlesSorted}
                        totalResults={totalResults}
                        pageSize={filter.pageSize}
                        page={filter.page}
                        onPageChanged={page => this.updateFilter({ page })}
                    />

                    <Footer />
                </div>

                <BackToTop />
            </>
        );
    }
}

export default App;
