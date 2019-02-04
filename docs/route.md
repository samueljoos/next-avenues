# [next-avenues](https://github.com/samueljoos/next-avenues) *0.2.2*

> A fancy dynamic router for Next.js heavily inspired on Adonis.js and next-routes


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
| route | `string`  |  | &nbsp; |




##### Returns


-  



#### _instantiate(router, route, page)  *private method*

Instantiate private properties on the route instance




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| router | `Router`  |  | &nbsp; |
| route | `string`  |  | &nbsp; |
| page | `string`  |  | &nbsp; |




##### Returns


- `Void`



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


- `Void`



#### _getSubDomains(host)  *private method*

Returns an object of dynamic domains for a given
route.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| host | `string`  |  | &nbsp; |




##### Returns


- `Object` `Null`  



#### domain(domain) 

Define domain for the route. If domain is defined
then route will only resolve when domain matches.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| domain | `string`  |  | &nbsp; |




##### Examples

```javascript
Route
  .get(...)
  .domain('blog.nextjs.org')
```


##### Returns


- `Route`  



#### as(name) 

Define a name as an identifier for your route.
The main benefit of using a name is that you can make change the route
without having to refactor all your route references.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  |  | &nbsp; |




##### Examples

```javascript
Route
  .get(...)
  .as('name')
```


##### Returns


- `Route`  



#### prefix(prefix) 

Prefix the route with some string.
Generally used by the @ref(Route/group) to prefix a bunch of routes.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| prefix | `string`  |  | &nbsp; |




##### Examples

```javascript
Route
  .get(...)
  .prefix('api/v1')
```


##### Returns


- `Route`  



#### data(data) 

Associate some static data with a route.

Example: This can be handy when you want to create multilingual domain setup.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `string`  |  | &nbsp; |




##### Examples

```javascript
const multilingualRoutes = () => {
    router.add('/path', 'page')
}
router.group(multilingualRoutes).domain('myfrenchwebsite.fr').data({lang: 'fr'})
router.group(multilingualRoutes).domain('mydutchwebsite.nl').data({lang: 'nl'})
```


##### Returns


- `Route`  



#### resolve(url, host) 

Resolves the url by matching it against
the registered route and verbs. It will
return an empty object when the url
doesn't match to this route.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| url | `string`  |  | &nbsp; |
| host | `string`  |  | &nbsp; |




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
| data | `Object`  |  | &nbsp; |
| options | `Object`  |  | &nbsp; |




##### Returns


- `string`  



#### getPage() 

Get the Next.js page component name.






##### Returns


- `string`  



#### getNextLinkProps(data, options) 

Get the next/link component props for this route.
Generally you don't need this function and it's
beter to use the @Ref(Router/Link) component.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `Object`  |  | &nbsp; |
| options | `Object`  |  | &nbsp; |




##### Returns


- `Object`  



#### toJSON() 

Returns the JSON representation of the route.






##### Returns


- `Object`  




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
