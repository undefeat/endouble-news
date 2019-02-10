import ErrorWrapped from '../classes/ErrorWrapped';

/**
 * Singleton for working with restcountries.eu API.
 *
 * @class CountryService
 */
class CountryService {
    apiUrl = 'https://restcountries.eu/rest/v2/all';

    errorMessage = "Couldn't fetch countries.";

    /**
     * Fetches information about countries.
     *
     * @returns a Promise that resolves to an array of objects containing country code, name and nativeName.
     * @memberof CountryService
     */
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
