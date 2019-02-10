import CountryService from './CountryService';

const countriesAll = require('./__mocked-responses__/countries-all.json');

describe('getCountries', () => {
    beforeEach(() => fetch.resetMocks());

    it('should correctly map the response body', async () => {
        expect.assertions(countriesAll.length * 3);
        fetch.mockResponseOnce(JSON.stringify(countriesAll));

        const countries = await CountryService.getCountries();

        countries.forEach((country) => {
            expect(typeof country.name).toBe('string');
            expect(typeof country.nativeName).toBe('string');
            expect(country.code).toMatch(/^[a-z]{2}$/);
        });
    });

    it('should throw when empty response', async () => {
        expect.assertions(1);
        try {
            await CountryService.getCountries();
        } catch (e) {
            expect(e.message).toMatch(CountryService.errorMessage);
        }
    });
});
