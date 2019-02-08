/**
 * Has a custom human readable message of what happened and a message from the original error.
 * @class ErrorWrapped
 * @extends {Error}
 */
class ErrorWrapped extends Error {
    /**
     * Creates an instance of ErrorWrapped.
     * @param {string} message short human readable description of what happened.
     * @param {Error} originalError original error thrown.
     * @memberof ErrorWrapped
     */
    constructor(message, originalError) {
        super(`${message}${originalError ? `\nCaused by: "${originalError.message}".` : ''}`);
        this.name = 'ErrorWrapped';
        this.e = originalError;
    }
}

export default ErrorWrapped;
