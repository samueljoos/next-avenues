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
     * Validates the route to make sure it is a
     * valid string
     *
     * @method _validateRoute
     *
     * @param  {String}       route
     *
     * @return {void}
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
     * Instantiate private properties on the route instance
     *
     * @method _instantiate
     *
     * @param  {String}              route
     * @param  {Array}               verbs
     * @param  {Function|String}     handler
     *
     * @return {void}
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
     * Make the regexp pattern for the route. Later this
     * expression is used to match urls.
     *
     * @method _makeRoutePattern
     *
     * @return {void}
     *
     * @private
     */
    _makeRoutePattern() {
        this._keys = [];
        this._regexp = pathToRegexp(this._route, this._keys);
    }

    /**
     * Returns an object of dynamic domains for a given
     * route.
     *
     * @method _getSubDomains
     *
     * @param  {String}       host
     *
     * @return {Object|Null}
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
     * Define domain for the route. If domain is defined
     * then route will only resolve when domain matches.
     *
     * @method domain
     *
     * @param  {String}  domain
     *
     * @chainable
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
     * Define a name as an identifier for your route.
     * The main benefit of using a name is that you can make change the route
     * without having to refactor all your route references.
     *
     * @method as
     *
     * @param  {String} name
     *
     * @chainable
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
     * Prefix the route with some string.
     * Generally used by the @ref(Route/group) to prefix
     * a bunch of routes.
     *
     * @method prefix
     *
     * @param  {String} prefix
     *
     * @chainable
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
     * Associate some static data with a route.
     *
     * Example: This can be handy when you want to create multilingual domain setup.
     *
     *
     * @method prefix
     *
     * @param  {String} prefix
     *
     * @chainable
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
     * Resolves the url by matching it against
     * the registered route and verbs. It will
     * return an empty object when the url
     * doesn't match to this route.
     *
     * @method resolve
     *
     * @param  {String} url
     * @param  {String} verb
     * @param  {String} [host] - Required only when route has subdomain
     *
     * @return {Object}
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
     * Get an url based on the data and options provided.
     *
     * @method getUrl
     *
     * @param {object} data
     * @param {object} options
     *
     * @return {string}
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
     * Get the Next.js page component name.
     *
     * @method getPage
     *
     * @return {String}
     */
    getPage() {
        return this.page;
    }

    /**
     * Get the next/link component props for this route.
     * Generally you don't need this function and it's
     * beter to use the @Ref(Router/Link) component.
     *
     * @method getPage
     *
     * @return {String}
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
     * Returns the JSON representation of the route.
     *
     * @method toJSON
     *
     * @return {Object}
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
