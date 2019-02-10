import PropTypes from 'prop-types';

export default PropTypes.shape({
    source: PropTypes.string,
    author: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    title: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string,
    urlToImage: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
    publishedAt: PropTypes.string,
    content: PropTypes.oneOfType([PropTypes.string, PropTypes.oneOf([null])]),
});
