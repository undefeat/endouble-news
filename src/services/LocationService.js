import HeadlineService from './HeadlineService';

class LocationService {
    saveFilterToHistory = (filter) => {
        const query = HeadlineService.getQueryString(filter);
        window.history.pushState(filter, null, query);
    };

    getFilterFromQuery = () => {
        const query = window.location.search;
        const paramStr = query.split('?')[1];
        if (paramStr) {
            const paramPairs = paramStr.split('&');
            const paramObj = {};
            for (let i = 0; i < paramPairs.length; i += 1) {
                const [key, value] = paramPairs[i].split('=');
                if (value && !Number.isNaN(Number(value))) {
                    paramObj[key] = Number(value);
                } else {
                    paramObj[key] = value;
                }
            }
            return paramObj;
        }

        return {};
    };
}

export default new LocationService();
