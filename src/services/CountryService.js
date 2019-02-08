class CountryService {
    API = 'https://restcountries.eu/rest/v2/all';

    errorMessage = "Couldn't fetch countries.";

    async getCountries() {
        try {
            const response = await fetch(this.API);
            const body = await response.json();
            const countries = body.map(country => ({
                name: country.name,
                nativeName: country.nativeName,
                code: country.alpha2Code,
            }));
            return countries;
        } catch (e) {
            throw Error(this.errorMessage);
        }
    }
}

export default new CountryService();
