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
 * `router.group` method on @ref('Router')
 * class.
 *
 * @class Group
 * @constructor
 *
 */
class Group {
    constructor(routes, name = null) {
        this._routes = routes;
        this._name = name;
    }

    /**
     * @description
     * Give a name to a group of routes.
     * This will prefix all routes name.
     *
     * @function as
     * @param {string} name
     * @returns {Group}
     *
     * @example
     * router
     *   .group()
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
     * Also see @ref('Route/prefix')
     *
     * @function prefix
     *
     * @param {string} prefix
     * @returns {Group}
     *
     * @example
     * router
     *   .group()
     *   .prefix('api/v1')
     */
    prefix(prefix) {
        this._routes.forEach((route) => route.prefix(prefix));
        return this;
    }

    /**
     * @description
     * Add domain to a group of routes.
     * Also see @ref('Route/domain')
     *
     * @function domain
     *
     * @param  {string} domain
     * @returns {Group}
     *
     * @example
     * router
     *   .group()
     *   .domain('blog.adonisjs.com')

     */
    domain(domain) {
        this._routes.forEach((route) => route.domain(domain));
        return this;
    }

    /**
     * @description
     * Add data to a group of routes.
     * Also see @ref('Route/data')
     *
     * @function data
     *
     * @param  {string} data
     * @returns {Group}
     *
     * @example
     * router
     *   .group()
     *   .data({ lang: 'nl' })
     */
    data(data) {
        this._routes.forEach((route) => route.data(data));
        return this;
    }
}

export default Group;
