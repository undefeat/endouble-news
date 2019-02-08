import CountryService from '../CountryService';

const countriesAll = require('./responses/countries-all.json');

describe('getCountries', () => {
    beforeEach(() => fetch.resetMocks());

    it('should correctly map the response body', async () => {
        expect.assertions(countriesAll.length * 4);
        fetch.mockResponseOnce(JSON.stringify(countriesAll));

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
