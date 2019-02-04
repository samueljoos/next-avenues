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
import { createElement, Children, cloneElement } from 'react';
import { default as NextLink } from 'next/link';
import { errorMessage } from './utils';

/**
 * Router is the public interface used to define
 * routes, groups and Link components.
 *
 * @singleton
 *
 * @class Router
 */
class Router {
    constructor() {
        this.Link = this.Link.bind(this);
        this.getRequestHandler = this.getRequestHandler.bind(this);
        this._initialize();
    }

    /**
     * Initialize the client url location data
     *
     * @method _validateGroupClosure
     *
     * @param  {Function} callback
     *
     * @return {void}
     *
     * @private
     */
    _initialize() {
        if (typeof window !== 'undefined') {
            this.port = document.location.port;
            this.domain = document.location.host.split(':')[0];
            this.protocol = document.location.protocol.split(':')[0];
        }
    }

    /**
     * Validates the group closure to make sure
     * it is a function
     *
     * @method _validateGroupClosure
     *
     * @param  {Function} callback
     *
     * @return {void}
     *
     * @private
     */
    _validateGroupClosure(callback) {
        if (typeof callback !== 'function') {
            throw errorMessage('Route.group expects a callback', callback);
        }
    }

    /**
     * Validates that nested groups are not created.
     *
     * @method _validateNestedGroups
     *
     * @return {void}
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
     * Creates a new route which resolves to a Next.js page component.
     * @method add
     * @param {String} route
     * @param {String} page
     * @return {Route}
     */

    add(route, page) {
        const routeInstance = new Route(this, route, page);
        RouteStore.add(routeInstance);
        return routeInstance;
    }

    /**
     * Resolves and returns the route that matches given **url** and **host**
     *
     * **Note:** The first matching route will be used. So make
     * sure the generic routes are created after the
     * static routes.
     * @method match
     * @param {String} url
     * @param {String} host
     * @return {Object}
     */
    match(url, host) {
        const protocol = `${this.protocol}://`;
        const parsedHost = parse(protocol + host);
        const domain = parsedHost.hostname;
        const parsedUrl = parse(url, true);
        const { pathname, query } = parsedUrl;
        let resolvedUrl = {};

        /**
		 * Find the first matching route.
		 */
        const matchingRoute = RouteStore.list().find(route => {
            resolvedUrl = route.resolve(pathname, domain);
            return resolvedUrl;
        });

        /**
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
     * Create a group of routes
     *
     * @method group
     *
     * @param {string} [name == null]
     * @param {Function} callback
     * @return {Group}
     *
     * @example
     * routes.group(() => {
     *     routes.add('/', 'dashboard')
     * }).prefix('admin')
     */
    group() {
        let name = null;
        let callback = null;

        if (arguments.length > 1) {
            [ name, callback ] = arguments;
        } else {
            [ callback ] = arguments;
        }


        this._validateGroupClosure(callback);
        this._validateNestedGroups();
        RouteStore.breakpoint(name);
        callback();

        /**
		 * Create a new group and pass all the routes
		 * to the group.
		 */
        const group = new RouteGroup(RouteStore.breakpointRoutes());

        RouteStore.releaseBreakpoint();
        return group;
    }
    /**
     * Returns an array of all the registered routes
     *
     * @method list
     *
     * @return {Array}
     */
    list() {
        return RouteStore.list();
    }

    /**
     * Link component for react
     *
     * @method Link
     *
     * @param {object} props
     * @return React.Element
     */
    Link({ children, name, params, domain, protocol, query, ...newProps }) {
        const child = Children.only(children);
        let href = newProps.as || newProps.href;
        const props = {
            onClick: (e) => {
                if (child.props && typeof child.props.onClick === 'function') {
                    child.props.onClick(e);
                }
                this.path = href && href.split('?')[0];
            }
        };

        try {
            const route = RouteStore.find(name, domain || this.domain);
            const nextLinkProps = route.getNextLinkProps(params, { domain, protocol: protocol, query });
            href = nextLinkProps.as;
            return createElement(NextLink, { ...newProps, ...nextLinkProps }, cloneElement(child, props));
        } catch (e) {
            return createElement(NextLink, { ...newProps }, child);
        }
    }

    /**
     * Return the current active route.
     * This is usualy called inside the getInitialProps a Next.js page component.
     *
     * @method getCurrentRoute
     * @return {object}
     */
    getCurrentRoute() {
        let path;
        let domain;
        if (typeof window !== 'undefined') {
            path = this.path || document.location.href;
            domain = document.location.host;
        } else {
            path = this.currentUrl;
            domain = this.currentHost;
        }
        return this.match(path, domain);
    }

    /**
     * Middleware function for your nextjs server setup.
     *
     * @method getRequestHandler
     * @param {Next.App} app
     * @param {Function} customHandler
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
}

export default new Router();
