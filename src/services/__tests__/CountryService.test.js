import CountryService from '../CountryService';

const countriesReponse = require('./countries-response.json');

describe('CountryService', () => {
    beforeEach(() => fetch.resetMocks());

    it('should correctly map the response body', async () => {
        expect.assertions(countriesReponse.length * 4);
        fetch.mockResponseOnce(JSON.stringify(countriesReponse));

        const countries = await CountryService.getCountries();

        countries.forEach((country) => {
            expect(typeof country.name).toBe('string');
            expect(typeof country.nativeName).toBe('string');
            expect(typeof country.code).toBe('string');
            expect(country.code.length).toBe(2);
        });
    });

    it('should throw when empty response', async () => {
        expect.assertions(1);
        try {
            await CountryService.getCountries();
        } catch (e) {
            expect(e.message).toEqual(CountryService.errorMessage);
        }
    });
});
