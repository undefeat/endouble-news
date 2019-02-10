import formatDate from './formatDate';

describe('formatDate', () => {
    beforeEach(() => {
        Date.now = jest.fn(() => new Date('2019-02-06T14:52:18.693Z').getTime());
    });

    it('should return time passed in "s" when more than 1000ms and less than 60s', () => {
        expect(formatDate('2019-02-06T14:52:12.500Z')).toBe('6 seconds ago');
    });

    it('should return time passed in "min" when more than 60s and less than 60m', () => {
        expect(formatDate('2019-02-06T14:16:12.500Z')).toBe('36 minutes ago');
    });

    it('should return "hours" when more than 60m and less than 12hrs', () => {
        expect(formatDate('2019-02-06T13:52:18.693Z')).toBe('1 hour ago');
        expect(formatDate('2019-02-06T12:59:18.693Z')).toBe('2 hours ago');
        expect(formatDate('2019-02-06T11:35:18.693Z')).toBe('3 hours ago');
        expect(formatDate('2019-02-06T03:42:18.693Z')).toBe('11 hours ago');
    });

    it('should return "today" when more than 12hrs and less than 24hrs', () => {
        expect(formatDate('2019-02-06T02:52:18.693Z')).toBe('today');
        expect(formatDate('2019-02-05T15:52:18.693Z')).toBe('today');
    });

    it('should return "yesterday" when more than 24hrs and less than 48hrs', () => {
        expect(formatDate('2019-02-05T13:52:18.693Z')).toBe('yesterday');
        expect(formatDate('2019-02-04T15:00:18.693Z')).toBe('yesterday');
    });

    it('should return time passed in "days" when more than 48hrs and less than 30d', () => {
        expect(formatDate('2019-02-03T14:52:18.693Z')).toBe('3 days ago');
        expect(formatDate('2019-01-19T02:16:12.500Z')).toBe('19 days ago');
        expect(formatDate('2019-01-17T02:16:12.500Z')).toBe('21 day ago');
        expect(formatDate('2019-01-08T02:16:12.500Z')).toBe('30 days ago');
    });

    it('should return time passed in "months" when more than 30d and less than 365d', () => {
        expect(formatDate('2019-01-01T14:52:18.693Z')).toBe('1 month ago');
        expect(formatDate('2018-08-19T02:16:12.500Z')).toBe('6 months ago');
        expect(formatDate('2018-03-06T14:52:18.693Z')).toBe('11 months ago');
    });

    it('should return time passed in "year" when more than 365d', () => {
        expect(formatDate('2018-02-06T14:52:18.693Z')).toBe('1 year ago');
        expect(formatDate('2012-05-08T14:52:18.693Z')).toBe('7 years ago');
    });
});
