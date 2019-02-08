import React from 'react';
import CountryService from '../../services/CountryService';

class App extends React.Component {
    state = {
        countries: [],
        loading: false,
    };

    async componentDidMount() {
        try {
            this.setState({ loading: true });

            const countries = await CountryService.getCountries();

            this.setState({ countries, loading: false });
        } catch (e) {
            this.setState(() => {
                throw e;
            });
        }
    }

    render() {
        const { countries, loading } = this.state;
        console.log(countries, loading);
        return <h1>Hello World</h1>;
    }
}

export default App;
