import ErrorWrapped from '../classes/ErrorWrapped';

class CountryService {
    apiUrl = 'https://restcountries.eu/rest/v2/all';

    errorMessage = "Couldn't fetch countries.";

    async getCountries() {
        try {
            const response = await fetch(this.apiUrl);
            const body = await response.json();
            const countries = body.map(country => ({
                code: country.alpha2Code.toLowerCase(),
                name: country.name,
                nativeName: country.nativeName,
            }));
            return countries;
        } catch (e) {
            throw new ErrorWrapped(this.errorMessage, e);
        }
    }
}

export default new CountryService();
