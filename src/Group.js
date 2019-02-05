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
 * Group class is used to group routes with
 * common behavior. For example prefixing a bunch
 * of routes.
 *
 * An instance of group is obtained by calling the
 * `router.group` method on [Router](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md)
 * class.
 *
 * @class Group
 * @constructor
 *
 */
class Group {
    constructor(routes) {
        this._routes = routes;
    }

    /**
     * @description
     * Give a name to a group of routes.
     * This will prefix all routes name.
     * Also see [Route.as](https://github.com/samueljoos/next-avenues/blob/master/docs/route.md#asname)
     *
     * @function as
     * @param {string} name Prefix for the route names seperated by a '.'.
     * @returns {Group}
     *
     * @example
     * router
     *   .group(() => {
     *      router.add('/', 'dashboard').as('dashboard');
     *      // the route name will be admin.dashboard
     *   })
     *   .as('admin')
     */
    as(name) {
        this._routes.forEach((route) => {
            if (route.name.length > 0) {
                route.name = `${name}.${route.name}`;
            }
        });

        return this;
    }

    /**
     * @description
     * Prefix group of routes.
     * Also see [Route.prefix](https://github.com/samueljoos/next-avenues/blob/master/docs/route.md#prefixprefix)
     *
     * @function prefix
     *
     * @param {string} prefix Prefix for the route paths.
     * @returns {Group}
     *
     * @example
     * router
     *   .group(() => {
     *      router.add('/articles', 'articles').as('articles');
     *      // the resolved route path will be /api/v1/articles
     *   })
     *   .prefix('api/v1')
     */
    prefix(prefix) {
        this._routes.forEach((route) => route.prefix(prefix));
        return this;
    }

    /**
     * @description
     * Add domain to a group of routes.
     * Also see [Route.domain](https://github.com/samueljoos/next-avenues/blob/master/docs/route.md#domaindomain)
     *
     * @function domain
     *
     * @param  {string} domain Domain for the routes.
     * @returns {Group}
     *
     * @example
     * router
     *   .group(() => {
     *      router.add('/', 'home').as('home');
     *      // the resolved route path will be http://next-avenues.com/
     *   })
     *   .domain('next-avenues.com')
     */
    domain(domain) {
        this._routes.forEach((route) => route.domain(domain));
        return this;
    }

    /**
     * @description
     * Add data to a group of routes.
     * Also see [Route.data](https://github.com/samueljoos/next-avenues/blob/master/docs/route.md#datadata)
     *
     * @function data
     *
     * @param  {Object} data Data for the routes.
     * @returns {Group}
     *
     * @example
     * router
     *   .group(() => {
     *      router.add('/', 'home').as('home');
     *      // the data object will be provided on the currentRoute object
     *   })
     *   .data({ lang: 'nl' })
     */
    data(data) {
        this._routes.forEach((route) => route.data(data));
        return this;
    }
}

export default Group;
