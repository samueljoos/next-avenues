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

/**
 * Route store is used to store registered routes as an
 * array. It is a singleton store to be exported and
 * used by an part of the application to store
 * routes.
 *
 *
 * @class RouteStore
 * @static
 */
class Store {
    constructor() {
        this._routes = [];
        this.releaseBreakpoint();
    }

    /**
	 * @description
	 * Add a breakpoint to routes. All routes after the
	 * breakpoint will be recorded seperately. Helpful
	 * for @ref(Route/group).
	 *
	 * Also only one breakpoint at a time is allowed.
	 *
	 * @function breakpoint
	 *
	 * @param {string} name Breakpoint name.
	 */
    breakpoint(name = null) {
        this._breakpoint.enabled = true;
        this._breakpoint.name = name;
    }

  	/**
	   * @description
	 * Returns a boolean indicating whether breakpoint
	 * is enabled or not.
	 *
	 * @function hasBreakpoint
	 *
	 * @returns {boolean}
	 */
    hasBreakpoint() {
        return this._breakpoint.enabled;
    }

    /**
	 * @description
	 * Returns the routes recorded during
	 * breakpoint.
	 *
	 * @function breakpointRoutes
	 *
	 * @returns {Array}
	 */
    breakpointRoutes() {
        return this._breakpoint.routes;
    }

    /**
	 * @description
	 * Release the breakpoint.
	 *
	 * @function releaseBreakpoint
	 */
    releaseBreakpoint() {
        this._breakpoint = {
            enabled: false,
            routes: [],
            name: null
        };
    }

    /**
	 * @description
	 * Add a route to the store.
	 * This function is used by [Router.add](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md#routeraddroute-page)
	 * Also see [Route](https://github.com/samueljoos/next-avenues/blob/master/docs/route.md)
	 *
	 * @function add
	 *
	 * @param  {Route} route Route instance.
	 */
    add(route) {
        if (this.hasBreakpoint()) {
            this._breakpoint.routes.push(route);
        }
        this._routes.push(route);
    }

    /**
	 * @description
	 * Remove route from the store.
	 *
	 * @function remove
	 *
	 * @param  {Route} routeToRemove Route instance.
	 */
    remove(routeToRemove) {
        const removeCallback = (route, index) => {
            if (route === routeToRemove) {
                delete this._routes[index];
            }
        };

        this._routes.forEach(removeCallback);
        if (this.hasBreakpoint()) {
            this._breakpoint.routes.forEach(removeCallback);
        }
    }

    /**
	 * @description
	 * Clear all the routes store so far.
	 *
	 * @function clear
	 */
    clear() {
        this._routes = [];
    }

    /**
	 * @description
	 * Find a route with name or it's url
	 *
	 * @function find
	 *
	 * @param {string} routeNameOrHandler Route name or path template.
	 * @param {string} domain For domain matching not used for subdomain matching.
	 *
	 * @returns {Object|Null}
	 */
    find(routeNameOrHandler, domain) {
        return this._routes.find(route => {
            const isName = route.name === routeNameOrHandler;
            const isRoute = route._route === routeNameOrHandler;
            const isDomain = route._domain === domain;
            return (route._domain && route.domainKeys.length === 0) ? isDomain && (isName || isRoute) : (isName || isRoute);
        });
    }

    /**
	 * @description
	 * Returns a list of stored routes.
	 *
	 * @function list
	 *
	 * @returns {Array}
	 */
    list() {
        return this._routes;
    }
}

export default new Store();
