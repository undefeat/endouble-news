const countriesAll = require('./__tests__/responses/countries-all.json');

class CountryService {
    apiUrl = 'https://restcountries.eu/rest/v2/all';

    errorMessage = "Couldn't fetch countries.";

    async getCountries() {
        try {
            // const response = await fetch(this.apiUrl);
            // const body = await response.json();
            const body = countriesAll;
            const countries = body.map(country => ({
                code: country.alpha2Code.toLowerCase(),
                name: country.name,
                nativeName: country.nativeName,
            }));
            return countries;
        } catch (e) {
            throw Error(this.errorMessage);
        }
    }
}

export default new CountryService();
