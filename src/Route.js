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
     * Define domain for the route. If domain is defined
     * then route will only resolve when domain matches.
     * Also see [Group.domain](https://github.com/samueljoos/next-avenues/blob/master/docs/group.md#domaindomain).
     *
     * @function domain
     *
     * @param  {string}  domain The domain template string.
     * @returns {Route}
     *
     * @example
     * router
     *   .add('/', 'home')
     *   .domain('blog.next-avenues.org')
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
     * @param  {string} name The route name.
     *
     * @returns {Route}
     *
     * @example
     * router
     *   .add('/', 'home')
     *   .as('name')
     */
    as(name) {
        this.name = name;
        return this;
    }

    /**
     * @description
     * Prefix the route with some string.
     * Generally used via [Group.prefix](https://github.com/samueljoos/next-avenues/blob/master/docs/group.md#prefixprefix) to prefix a bunch of routes.
     *
     * @function prefix
     *
     * @param  {string} prefix
     *
     * @returns {Route}
     *
     * @example
     * router
     *   .add('/articles', 'articles')
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
     * Associate some static (meta)data with a route.
     * This data will be available when you call [Router.getCurrentRoute](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md#getcurrentroute).
     * Also see [Group.data](https://github.com/samueljoos/next-avenues/blob/master/docs/group.md#datadata).
     *
     * Example: This can be handy when you want to create multilingual domain setup.
     *
     * @function data
     *
     * @param  {Object} data Static data.
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
     * @param  {string} url The url string.
     * @param  {string} host The domain string.
     *
     * @returns {Object}
     */
    resolve(url, host) {
        /*
		 * Check for matching subdomains
		 */
        const subdomains = this._getSubDomains(host);
        if (this.forDomain && !subdomains) {
            return null;
        }

        /*
		 * Nothing needs processing, since the route
		 * and the url are same.
		 */
        if (this._route === url) {
            return { url, params: {}, subdomains: subdomains || {}};
        }

        /*
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
     * Create an url based on the params and options provided.
     *
     * @function getUrl
     *
     * @param {Object.<string, string>} [params] Data to build the url path.
     * @param {{protocol: ?string, domain: ?string, query:?Object.<string, string>}} options Options object.
     *
     * @returns {string}
     */
    getUrl(params = {}, options = {}) {
        let compiledDomain;

        if (this._domain) {
            if (this.domainKeys.length) {
                compiledDomain = pathToRegexp.compile(this._domain)(params);
            } else {
                compiledDomain = this._domain;
            }
        }

        const compiledRoute = pathToRegexp.compile(this._route)(params || {});

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
     * @param {Object.<string, string>} [params] Data to build the url path.
     * @param {{protocol: ?string, domain: ?string, query:?Object.<string, string>}} [options] Options object.
     *
     * @returns {Object}
     */
    getNextLinkProps(params = {}, options = {}) {
        const url = this.getUrl(params, options);
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
     * Returns a JSON representation of the route.
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

    //////
    // Private functions
    //////

    /**
     * @description
     * Validates the route to make sure it is a
     * valid string
     *
     * @function _validateRoute
     *
     * @param {string} route The route template path.
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
     * @param  {Router} router Reference to the [Router](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md).
     * @param  {string} route The route template path.
     * @param  {string} page The Next.js page component name.
     *
     * @private
     */
    _instantiate(router, route, page) {
        this.router = router;
        this._validateRoute(route);

        const routenName = `/${route.replace(/^\/|\/$/g, '')}`;

        // private properties
        this._route = routenName === '/*' ? '/(.*)' : routenName;
        this._keys = [];

        // public properties
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
     * @param {string} host The domain template string.
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
}

export default Route;
