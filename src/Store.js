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
	 * Add a breakpoint to routes. All routes after the
	 * breakpoint will be recorded seperately. Helpful
	 * for @ref(Route/group).
	 *
	 * Also only one breakpoint at a time is allowed.
	 *
	 * @method breakpoint
	 *
	 * @param  {String}   name
	 *
	 * @return {void}
	 */
    breakpoint(name = null) {
        this._breakpoint.enabled = true;
        this._breakpoint.name = name;
    }

  	/**
	 * Returns a boolean indicating whether breakpoint
	 * is enabled or not.
	 *
	 * @method hasBreakpoint
	 *
	 * @return {Boolean}
	 */
    hasBreakpoint() {
        return this._breakpoint.enabled;
    }

    /**
	 * Returns the routes recorded during
	 * breakpoint.
	 *
	 * @method breakpointRoutes
	 *
	 * @return {void}
	 */
    breakpointRoutes() {
        return this._breakpoint.routes;
    }

    /**
	 * Release the breakpoint.
	 *
	 * @method releaseBreakpoint
	 *
	 * @return {void}
	 */
    releaseBreakpoint() {
        this._breakpoint = {
            enabled: false,
            routes: [],
            name: null
        };
    }

    /**
	 * Add a route to the store
	 *
	 * @method add
	 *
	 * @param  {Route} route
	 */
    add(route) {
        if (this.hasBreakpoint()) {
            this._breakpoint.routes.push(route);
        }
        this._routes.push(route);
    }

    /**
	 * Remove route from the store.
	 *
	 * @method remove
	 *
	 * @param  {Route} routeToRemove
	 *
	 * @return {void}
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
	 * Clear all the routes store so far.
	 *
	 * @method clear
	 *
	 * @return {void}
	 */
    clear() {
        this._routes = [];
    }

    /**
	 * Find a route with name or it's url
	 *
	 * @method find
	 *
	 * @param  {String} nameOrRoute
	 * @param  {String} domain
	 *
	 * @return {Object|Null}
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
	 * Returns a list of stored routes.
	 *
	 * @method list
	 *
	 * @return {Array}
	 */
    list() {
        return this._routes;
    }
}

export default new Store();
