/*
 * Next Avenues
 *
 * (c) Samuel Joos
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

/**
 * Create a url query string from an object
 * @method toQuerystring
 * @param {Object} obj
 */
export const toQuerystring = obj =>
    '?' + Object.keys(obj)
        .filter(key => obj[key] !== null && obj[key] !== undefined)
        .map(key => {
            let value = obj[key];

            if (Array.isArray(value)) {
                value = value.join('/');
            }
            return [encodeURIComponent(key), encodeURIComponent(value)].join('=');
        })
        .join('&');

/**
 * Format error Message
 * @param {string} message
 * @param {*} subject
 */
export const errorMessage = (message, subject) => {
    return `${message} for ${subject}`;
};
