/**
 * @param date The date and time in UTC (+000).
 * @return a string that repserents how much time ellapsed since the given date.
 */
function formatDate(date = '1970-01-01T00:00:00.000Z') {
    const timestamp = new Date(date).getTime();
    const now = Date.now();
    const ellapsed = (now - timestamp) / 1000;

    if (ellapsed < 60) {
        return `${Math.round(ellapsed)} seconds ago`;
    }

    if (ellapsed < 60 * 60) {
        return `${Math.round(ellapsed / 60)} minutes ago`;
    }

    if (ellapsed < 1.5 * 60 * 60) {
        return '1 hour ago';
    }

    if (ellapsed < 12 * 60 * 60) {
        return `${Math.round(ellapsed / 60 / 60)} hours ago`;
    }

    if (ellapsed < 24 * 60 * 60) {
        return 'today';
    }

    if (ellapsed < 48 * 60 * 60) {
        return 'yesterday';
    }

    if (ellapsed < 22 * 24 * 60 * 60 && ellapsed > 20 * 24 * 60 * 60) {
        return '21 day ago';
    }

    if (ellapsed < 30 * 24 * 60 * 60) {
        return `${Math.round(ellapsed / 60 / 60 / 24)} days ago`;
    }

    if (ellapsed < 60 * 24 * 60 * 60) {
        return '1 month ago';
    }

    if (ellapsed < 365 * 24 * 60 * 60) {
        return `${Math.round(ellapsed / 60 / 60 / 24 / 30)} months ago`;
    }

    if (ellapsed < 1.5 * 365 * 24 * 60 * 60) {
        return '1 year ago';
    }

    return `${Math.ceil(ellapsed / 60 / 60 / 24 / 365)} years ago`;
}

export default formatDate;
