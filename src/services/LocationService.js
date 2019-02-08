import HeadlineService from './HeadlineService';

class LocationService {
    updateQueryParams = (filter) => {
        const query = HeadlineService.getQueryString(filter);
        window.history.pushState(filter, null, query);
    };
}

export default new LocationService();
