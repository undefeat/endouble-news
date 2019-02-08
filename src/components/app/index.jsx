import React from 'react';
import CountryService from '../../services/CountryService';
import HeadlineService from '../../services/HeadlineService';

class App extends React.Component {
    state = {
        articles: [],
        countries: [],
        filter: {
            country: 'us',
            category: '',
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

    render() {
        const { articles, countries, loading, totalResults } = this.state;
        console.log(articles, countries, loading, totalResults);
        return <h1>Hello World</h1>;
    }
}

export default App;
