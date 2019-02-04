# next-avenues *0.0.1*

> Sofisticated routes for nextjs


### src/Route.js


#### new Route() 

This class defines a single route. It supports dynamic
**url segments** associated **data**
and **named routes**.

Normally you don't need to create an instance of this class.
Use the Router singleton to create a route.

Example: `router.add(name, page)`






##### Returns


- `Void`



#### _validateRoute(route)  *private method*

Validates the route to make sure it is a
valid string




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| route | `String`  |  | &nbsp; |




##### Returns


-  



#### _instantiate(route, verbs, handler)  *private method*

Instantiate private properties on the route instance




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| route | `String`  |  | &nbsp; |
| verbs | `Array`  |  | &nbsp; |
| handler | `Function` `String`  |  | &nbsp; |




##### Returns


-  



#### this._route() 

Private properties






##### Returns


- `Void`



#### this.name() 

Public properties






##### Returns


- `Void`



#### _makeRoutePattern()  *private method*

Make the regexp pattern for the route. Later this
expression is used to match urls.






##### Returns


-  



#### _getSubDomains(host)  *private method*

Returns an object of dynamic domains for a given
route.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| host | `String`  |  | &nbsp; |




##### Returns


- `Object` `Null`  



#### domain(domain) 

Define domain for the route. If domain is defined
then route will only resolve when domain matches.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| domain | `String`  |  | &nbsp; |




##### Examples

```javascript
Route
  .get(...)
  .domain('blog.nextjs.org')
```


##### Returns


- `Void`



#### as(name) 

Define a name as an identifier for your route.
The main benefit of using a name is that you can make change the route
without having to refactor all your route references.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `String`  |  | &nbsp; |




##### Examples

```javascript
Route
  .get(...)
  .as('name')
```


##### Returns


- `Void`



#### prefix(prefix) 

Prefix the route with some string.
Generally used by the @ref(Route/group) to prefix
a bunch of routes.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| prefix | `String`  |  | &nbsp; |




##### Examples

```javascript
Route
  .get(...)
  .prefix('api/v1')
```


##### Returns


- `Void`



#### data(prefix) 

Associate some static data with a route.

Example: This can be handy when you want to create multilingual domain setup.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| prefix | `String`  |  | &nbsp; |




##### Examples

```javascript
const multilingualRoutes = () => {
    router.add('/path', 'page')
}
router.group(multilingualRoutes).domain('myfrenchwebsite.fr').data({lang: 'fr'})
router.group(multilingualRoutes).domain('mydutchwebsite.nl').data({lang: 'nl'})
```


##### Returns


- `Void`



#### resolve(url, verb[, host]) 

Resolves the url by matching it against
the registered route and verbs. It will
return an empty object when the url
doesn't match to this route.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| url | `String`  |  | &nbsp; |
| verb | `String`  |  | &nbsp; |
| host | `String`  | - Required only when route has subdomain | *Optional* |




##### Returns


- `Object`  



#### subdomains() 

Check for matching subdomains






##### Returns


- `Void`



#### if() 

Nothing needs processing, since the route
and the url are same.






##### Returns


- `Void`



#### tokens() 

Get route tokens if matched otherwise
return null.






##### Returns


- `Void`



#### getUrl(data, options) 

Get an url based on the data and options provided.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `object`  |  | &nbsp; |
| options | `object`  |  | &nbsp; |




##### Returns


- `string`  



#### getPage() 

Get the Next.js page component name.






##### Returns


- `String`  



#### getNextLinkProps() 

Get the next/link component props for this route.
Generally you don't need this function and it's
beter to use the @Ref(Router/Link) component.






##### Returns


- `String`  



#### toJSON() 

Returns the JSON representation of the route.






##### Returns


- `Object`  




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
