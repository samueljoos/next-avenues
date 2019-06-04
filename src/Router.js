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

import Route from './Route';
import RouteGroup from './Group';
import RouteStore from './Store';
import { parse } from 'url';
import { errorMessage } from './utils';
import NextRouter from 'next/router';

/**
 * @description
 * Router is the public interface used to define
 * routes, groups and Link components.
 *
 * @singleton
 *
 * @class Router
 */
class Router {
    constructor() {
        this.getRequestHandler = this.getRequestHandler.bind(this);
        this.withExportPathMap = this.withExportPathMap.bind(this);
        this.setCtx = this.setCtx.bind(this);
        this.NextRouter = NextRouter;
        this._initialize();
    }

    /**
     * @description
     * Creates a new route which resolves to a Next.js page component.
     * @function add
     * @param {string} route The route name.
     * @param {string} page The Next.js page component.
     * @return {Route}
     */

    /**
     * @description
     * Set the context of your page. Only needed when you want to do a static next export
     * @function setCtx
     * @param {Object} ctx
     * @param {string} protocol
     * @returns {void}
     */
    setCtx(ctx, protocol = 'https') {
        this.ctx = ctx;
        if (this.domain === undefined && RouteStore._domains) {
            this.domain = RouteStore._domains.find((domain) => this.ctx.asPath.split('/')[0].split('_dot_').join('.') === domain );
            this.protocol = protocol;
        }
    }

    /**
     * @description
     * Dynamicly create an exportPathMap config for static next exports based on your routes.js
     * @function withExportPathMap
     * @param {Object} config
     * @returns {Object}
     */
    withExportPathMap(config) {
        return {
            ...config,
            exportPathMap: async() => {
                const pages = {};

                await Promise.all([this.domain, ...RouteStore._domains].map(async(domain) => {
                    await Promise.all(this.list().map(async(route) => {
                        if (route._keys.length && route._export) {
                            const exportParams = await route._export(route);

                            exportParams.forEach((params) => {
                                const resolvedRoute = route.getNextLinkProps(params, { domain, protocol: this.protocol || 'http' }, true);
                                pages[resolvedRoute.as.replace(/.*\:\/\//, '').split('.').join('_dot_')] = { page: resolvedRoute.href, query: params };
                            });
                        } else {
                            const resolvedRoute = route.getNextLinkProps({}, { domain, protocol: this.protocol }, true);
                            pages[resolvedRoute.as.replace(/.*\:\/\//, '').split('.').join('_dot_')] = { page: resolvedRoute.href };
                        }
                    }));
                }));

                return pages;
            }
        };
    }

    /**
     * @description
     * Creates a new route which resolves to a Next.js page component.
     * @function add
     * @param {string} route The route name.
     * @param {string} page The Next.js page component.
     * @return {Route}
     */

    add(route, page) {
        const routeInstance = new Route(this, route, page);
        RouteStore.add(routeInstance);
        return routeInstance;
    }

    /**
     * @description
     * Resolves and returns the route that matches given **url** and **host**
     *
     * **Note:** The first matching route will be used. So make
     * sure the generic routes are created after the
     * static routes.
     * @function match
     * @param {string} url Url string to find a match for.
     * @param {string} host Domain to find a match for.
     * @returns {Object}
     */
    match(url, host) {
        const protocol = `${this.protocol}://`;
        const parsedHost = parse(protocol + host);
        const domain = parsedHost.hostname;
        const parsedUrl = parse(url, true);
        const { pathname, query } = parsedUrl;
        let resolvedUrl = {};

        /*
		 * Find the first matching route.
		 */
        const matchingRoute = RouteStore.list().find(route => {
            resolvedUrl = route.resolve(pathname, domain);
            return resolvedUrl;
        });

        /*
		 * Return null when unable to find a route.
		 */
        if (!matchingRoute) {
            return {};
        }

        return {
            ...matchingRoute.toJSON(),
            port: parsedHost.port,
            parsedUrl,
            pathname,
            query: { ...query, ...resolvedUrl.subdomains },
            data: matchingRoute.data,
            params: resolvedUrl.params,
            domain
        };
    }

    /**
     * @description
     * Create a group of routes.
     * Also see [Group](https://github.com/samueljoos/next-avenues/blob/master/docs/group.md).
     *
     * @function group
     *
     * @param {Function} callback Callback which should only contain calls to [Router.add](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md#routeraddroute-page).
     * @param {string} [name] Same as using [Route.as](https://github.com/samueljoos/next-avenues/blob/master/docs/group.md#asname).
     * @returns {Group}
     *
     * @example
     * routes.group(() => {
     *     routes.add('/', 'dashboard')
     *     // the route name will be admin.dashboard
     * }, 'admin')
     */
    group(callback, name) {
        this._validateGroupClosure(callback);
        this._validateNestedGroups();
        RouteStore.breakpoint(name);
        callback();

        /*
		 * Create a new group and pass all the routes
		 * to the group.
		 */
        const group = new RouteGroup(RouteStore.breakpointRoutes());
        if (name) {
            group.as(name);
        }

        RouteStore.releaseBreakpoint();
        return group;
    }

    /**
     * @description
     * Returns an array of all the registered routes
     *
     * @function list
     *
     * @returns {Array}
     */
    list() {
        return RouteStore.list();
    }

    /**
     * @description
     * Return the current active route.
     * This is usualy called inside the getInitialProps a Next.js page component.
     *
     * @function getCurrentRoute
     * @returns {Object}
     */
    getCurrentRoute() {
        let path = this.currentUrl || (this.ctx && this.ctx.req && this.ctx.req.url) || this.path || document.location.href;
        path = path.split('_dot_').join('.');

        let domain;

        if (typeof window !== 'undefined') {
            domain = document.location.host;
        } else {
            domain = this.currentHost || 'localhost:3000';
        }

        RouteStore._domains.forEach((d) => {
            if (path.indexOf(d) === 0) {
                domain = d;
                path = path.replace(d, '');
            }
        });

        return this.match(path, domain);
    }

    /**
     * @description
     * Middleware function for your nextjs server setup.
     *
     * @function getRequestHandler
     * @param {Next.App} app The value of Next.js next().
     * @param {Function} [customHandler] Callback to customise the renderHandler parameters.
     *
     * @returns {Function}
     */
    getRequestHandler(app, customHandler) {
        const nextHandler = app.getRequestHandler();

        return (req, res) => {
            const route = this.match(
                req.url,
                req.headers.host
            );

            this.currentUrl = req.url;
            this.currentHost = req.headers.host;
            this.port = route.port;
            this.domain = route.domain;
            this.protocol = req.headers.referer && req.headers.referer.split('://')[0] || 'http';

            if (route.pathname) {
                if (customHandler) {
                    customHandler({ req, res, route, query: route.query });
                } else {
                    app.render(req, res, '/' + route.page, route.query);
                }
            } else {
                nextHandler(req, res, route.parsedUrl);
            }
        };
    }

    /**
     * @description
     * Push State helper for navigating to a route.
     * **note:** This doesn't work serverside.
     *
     * @param {string} name The route name.
     * @param {Object} [params] The route parameters.
     * @param {Object} [query] The route query parameters.
     *
     * @example
     * router.add('/post/:slug','blog-post').as('blog-post');
     * router.pushRoute('blog-post', {slug:'post-slug'}, {order:'1'});
     * // resolves to /post/post-slug?order=1
     */
    pushRoute(name, params, query) {
        this._browserHistoryApply('push', name, params, query);
    }


    /**
     * @description
     * Replace State helper for navigating to a route.
     * **note:** This doesn't work serverside.
     *
     * @param {string} name The route name.
     * @param {Object} [params] The route parameters.
     * @param {Object} [query] The route query parameters.
     *
     * @example
     * router.add('/post/:slug','blog-post').as('blog-post');
     * router.replaceRoute('blog-post', {slug:'post-slug'}, {order:'1'});
     * // resolves to /post/post-slug?order=1
     */
    replaceRoute(name, params, query) {
        this._browserHistoryApply('replace', name, params, query);
    }

    /**
     * @description
     * Prefetch a route
     * **note:** This doesn't work serverside.
     *
     * @param {string} name The route name.
     * @param {Object} [params] The route parameters.
     * @param {Object} [query] The route query parameters.
     *
     * @example
     * router.add('/post/:slug','blog-post').as('blog-post');
     * router.prefetchRoute('blog-post', {slug:'post-slug'}, {order:'1'});
     * // prefetches the data for /post/post-slug?order=1
     */
    prefetchRoute(name, params, query) {
        this._browserHistoryApply('prefetch', name, params, query);
    }

    //////
    // Private functions
    //////

    /**
     * @description
     * Initialize the client url location data
     *
     * @function _validateGroupClosure
     *
     * @returns {void}
     *
     * @private
     */
    _initialize() {
        if (typeof window !== 'undefined') {
            this.port = document.location.port;
            this.domain = document.location.host.split(':')[0];
            this.protocol = document.location.protocol.split(':')[0];
            this.NextRouter.events.on('routeChangeStart', (url) => {
                this.path = url;
            });
        }
    }

    /**
     * @description
     * Validates the group closure to make sure
     * it is a function
     *
     * @function _validateGroupClosure
     *
     * @param  {Function} callback
     *
     * @private
     */
    _validateGroupClosure(callback) {
        if (typeof callback !== 'function') {
            throw errorMessage('Route.group expects a callback', callback);
        }
    }

    /**
     * @description
     * Validates that nested groups are not created.
     *
     * @function _validateNestedGroups
     *
     * @private
     */
    _validateNestedGroups() {
        if (RouteStore.hasBreakpoint()) {
            RouteStore.releaseBreakpoint();
            throw errorMessage(
                'Nested route groups are not allowed',
                500,
                'E_NESTED_ROUTE_GROUPS'
            );
        }
    }

    /**
     * @description
     * Helper function for browser history methods.
     * Used by [router.pushRoute](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md#pushroutenameparamsquery) [router.replaceRoute](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md#replaceroutenameparamsquery) [router.prefetchRoute](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md#prefetchroutenameparamsquery)
     *
     * @param {string} method Should be one of push, replace or prefetch.
     * @param {string} name The route name.
     * @param {Object} params The route Params.
     * @param {Object} query The route query.
     */
    _browserHistoryApply(method, name, params, query) {
        if (typeof window === 'undefined') {
            throw errorMessage('Pushing routes is only available in the client', 'router.push');
        }

        const route = RouteStore.find(name, this.domain);
        const nextLinkProps = route.getNextLinkProps(params, { domain: this.domain, protocol: this.protocol, query });
        this.NextRouter[method](nextLinkProps.href, nextLinkProps.as);
    }
}

export default new Router();
