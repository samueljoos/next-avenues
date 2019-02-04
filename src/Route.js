/*
 * Next Avenues
 *
 * (c) Samuel Joos
 *
 * Based on the work of
 * (c) Harminder Virk <virk@adonisjs.com>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
*/

import pathToRegexp from 'path-to-regexp';
import { toQuerystring, errorMessage } from './utils';

/**
 * This class defines a single route. It supports dynamic
 * **url segments** associated **data**
 * and **named routes**.
 *
 * Normally you don't need to create an instance of this class.
 * Use the Router singleton to create a route.
 *
 * Example: `router.add(name, page)`
 *
 * @class Route
 * @constructor
 */
class Route {
    constructor(router, route, page) {
        this._instantiate(router, route, page);
        this._makeRoutePattern();
    }

    /**
     * @description
     * Validates the route to make sure it is a
     * valid string
     *
     * @function _validateRoute
     *
     * @param {string} route
     *
     * @returns {void}
     *
     * @private
     */
    _validateRoute(route) {
        if (typeof route !== 'string') {
            throw errorMessage(
                'Cannot instantiate route without a valid url string',
                route
            );
        }
    }

    /**
     * @description
     * Instantiate private properties on the route instance
     *
     * @function _instantiate
     *
     * @param  {Router} router
     * @param  {string} route
     * @param  {string} page
     *
     * @private
     */
    _instantiate(router, route, page) {
        this.router = router;
        this._validateRoute(route);

        const routenName = `/${route.replace(/^\/|\/$/g, '')}`;

        /**
		 * Private properties
		 */
        this._route = routenName === '/*' ? '/(.*)' : routenName;
        this._keys = [];

        /**
		 * Public properties
		 */
        this.name = routenName;
        this.page = page;
        this.forDomain = null;
        this.domainKeys = [];
    }

    /**
     * @description
     * Make the regexp pattern for the route. Later this
     * expression is used to match urls.
     *
     * @function _makeRoutePattern
     *
     * @private
     */
    _makeRoutePattern() {
        this._keys = [];
        this._regexp = pathToRegexp(this._route, this._keys);
    }

    /**
     * @description
     * Returns an object of dynamic domains for a given
     * route.
     *
     * @function _getSubDomains
     *
     * @param {string} host
     *
     * @returns {Object|Null}
     *
     * @private
     */
    _getSubDomains(host) {
        if (!this.forDomain) {
            return null;
        }

        const domainTokens = this.forDomain.exec(host);
        if (!domainTokens) {
            return null;
        }

        return this.domainKeys.reduce((result, key, index) => {
            let value = domainTokens[index + 1] || null;
            result[key.name] = value;
            return result;
        }, {});
    }

    /**
     * @description
     * Define domain for the route. If domain is defined
     * then route will only resolve when domain matches.
     *
     * @function domain
     *
     * @param  {string}  domain
     * @returns {Route}
     *
     * @example
     * Route
     *   .get(...)
     *   .domain('blog.nextjs.org')
     */
    domain(domain) {
        this.domainKeys = [];
        const cleanDomain = `${domain.replace(/^\/|\/$/g, '')}`;
        this.forDomain = pathToRegexp(cleanDomain, this.domainKeys);
        this._domain = cleanDomain;
        return this;
    }

    /**
     * @description
     * Define a name as an identifier for your route.
     * The main benefit of using a name is that you can make change the route
     * without having to refactor all your route references.
     *
     * @function as
     *
     * @param  {string} name
     *
     * @returns {Route}
     *
     * @example
     * Route
     *   .get(...)
     *   .as('name')
     */
    as(name) {
        this.name = name;
        return this;
    }

    /**
     * @description
     * Prefix the route with some string.
     * Generally used by the @ref(Route/group) to prefix a bunch of routes.
     *
     * @function prefix
     *
     * @param  {string} prefix
     *
     * @returns {Route}
     *
     * @example
     * Route
     *   .get(...)
     *   .prefix('api/v1')
     */
    prefix(prefix) {
        const cleanPrefix = `/${prefix.replace(/^\/|\/$/g, '')}`;
        this._route = this._route === '/' ? cleanPrefix : `${cleanPrefix}${this._route}`;
        this._makeRoutePattern();
        return this;
    }

    /**
     * @description
     * Associate some static data with a route.
     *
     * Example: This can be handy when you want to create multilingual domain setup.
     *
     * @function data
     *
     * @param  {string} data
     *
     * @returns {Route}
     *
     * @example
     * const multilingualRoutes = () => {
     *     router.add('/path', 'page')
     * }
     * router.group(multilingualRoutes).domain('myfrenchwebsite.fr').data({lang: 'fr'})
     * router.group(multilingualRoutes).domain('mydutchwebsite.nl').data({lang: 'nl'})
     */
    data(data) {
        this.data = data;
        return this;
    }

    /**
     * @description
     * Resolves the url by matching it against
     * the registered route and verbs. It will
     * return an empty object when the url
     * doesn't match to this route.
     *
     * @function resolve
     *
     * @param  {string} url
     * @param  {string} host
     *
     * @returns {Object}
     */
    resolve(url, host) {
        /**
		 * Check for matching subdomains
		 */
        const subdomains = this._getSubDomains(host);
        if (this.forDomain && !subdomains) {
            return null;
        }

        /**
		 * Nothing needs processing, since the route
		 * and the url are same.
		 */
        if (this._route === url) {
            return { url, params: {}, subdomains: subdomains || {}};
        }

        /**
		 * Get route tokens if matched otherwise
		 * return null.
		 */
        const tokens = this._regexp.exec(url);
        if (!tokens) {
            return null;
        }

        const params = this._keys.reduce((result, key, index) => {
            let value = tokens[index + 1] || null;
            value = key.repeat && value ? value.split('/') : value;
            result[key.name] = value;
            return result;
        }, {});

        return { url, params, subdomains: subdomains || {}};
    }

    /**
     * @description
     * Get an url based on the data and options provided.
     *
     * @function getUrl
     *
     * @param {Object} data
     * @param {Object} options
     *
     * @returns {string}
     */
    getUrl(data, options) {
        let compiledDomain;

        if (this._domain) {
            if (this.domainKeys.length) {
                compiledDomain = pathToRegexp.compile(this._domain)(data);
            } else {
                compiledDomain = this._domain;
            }
        }

        const compiledRoute = pathToRegexp.compile(this._route)(data || {});

        /**
		 * When domain exists, build a complete url over creating
		 * a relative URL.
		 */

        compiledDomain = options.domain || compiledDomain;

        if (compiledDomain !== this.router.domain) {
            const protocol = options.protocol || this.router.protocol;
            const port = this.router.port ? ':' + this.router.port : '';
            return `${protocol}://${compiledDomain}${port}${compiledRoute}`;
        }

        return `${compiledRoute}${
            options.query ? toQuerystring(options.query || {}) : ''
        }`;
    }

    /**
     * @description
     * Get the Next.js page component name.
     *
     * @function getPage
     *
     * @returns {string}
     */
    getPage() {
        return this.page;
    }

    /**
     * @description
     * Get the next/link component props for this route.
     * Generally you don't need this function and it's
     * beter to use the @Ref(Router/Link) component.
     *
     * @function getNextLinkProps
     *
     * @param {Object} data
     * @param {Object} options
     *
     * @returns {Object}
     */
    getNextLinkProps(data, options) {
        const url = this.getUrl(data, options);
        const protocol = options.protocol || this.router.protocol;
        if (url.indexOf(protocol) === 0) {
            return {
                href: url
            };
        }
        return {
            as: url,
            href: '/' + this.page
        };
    }

    /**
     * @description
     * Returns the JSON representation of the route.
     *
     * @function toJSON
     *
     * @returns {Object}
     */
    toJSON() {
        return {
            route: this._route,
            name: this.name,
            domain: this._domain,
            data: this.data,
            page: this.page
        };
    }
}

export default Route;
