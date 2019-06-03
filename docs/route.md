# [next-avenues](https://github.com/samueljoos/next-avenues) *0.8.1*

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



#### domain(domain) 

Define domain for the route. If domain is defined
then route will only resolve when domain matches.
Also see [Group.domain](https://github.com/samueljoos/next-avenues/blob/master/docs/group.md#domaindomain).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| domain | `string`  | The domain template string. | &nbsp; |




##### Examples

```javascript
router
  .add('/', 'home')
  .domain('blog.next-avenues.org')
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
| name | `string`  | The route name. | &nbsp; |




##### Examples

```javascript
router
  .add('/', 'home')
  .as('name')
```


##### Returns


- `Route`  



#### export(callback) 

Add an async callback function returning an array of objects with route parameters to generate all dynamic export paths.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  |  | &nbsp; |




##### Examples

```javascript
router.add('/page/:uid', 'page')
  .as('page')
  .export(() => [
      {uid: 'test'},
      {uid: 'test123'},
      {uid: 'test1234'}
  ]);
```


##### Returns


- `Route`  



#### prefix(prefix) 

Prefix the route with some string.
Generally used via [Group.prefix](https://github.com/samueljoos/next-avenues/blob/master/docs/group.md#prefixprefix) to prefix a bunch of routes.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| prefix | `string`  |  | &nbsp; |




##### Examples

```javascript
router
  .add('/articles', 'articles')
  .prefix('api/v1')
```


##### Returns


- `Route`  



#### data(data) 

Associate some static (meta)data with a route.
This data will be available when you call [Router.getCurrentRoute](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md#getcurrentroute).
Also see [Group.data](https://github.com/samueljoos/next-avenues/blob/master/docs/group.md#datadata).

Example: This can be handy when you want to create multilingual domain setup.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `Object`  | Static data. | &nbsp; |




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
| url | `string`  | The url string. | &nbsp; |
| host | `string`  | The domain string. | &nbsp; |




##### Returns


- `Object`  



#### getUrl([params], options) 

Create an url based on the params and options provided.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| params | `Object.<string, string>`  | Data to build the url path. | *Optional* |
| options | `[object Object]`  | Options object. | &nbsp; |




##### Returns


- `string`  



#### getPage() 

Get the Next.js page component name.






##### Returns


- `string`  



#### getNextLinkProps([params, options], forExport) 

Get the next/link component props for this route.
Generally you don't need this function and it's
beter to use the @Ref(Router/Link) component.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| params | `Object.<string, string>`  | Data to build the url path. | *Optional* |
| options | `[object Object]`  | Options object. | *Optional* |
| forExport | `boolean`  | Options object. | &nbsp; |




##### Returns


- `Object`  



#### toJSON() 

Returns a JSON representation of the route.






##### Returns


- `Object`  



#### _validateRoute(route)  *private method*

Validates the route to make sure it is a
valid string




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| route | `string`  | The route template path. | &nbsp; |




##### Returns


-  



#### _instantiate(router, route, page)  *private method*

Instantiate private properties on the route instance




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| router | `Router`  | Reference to the [Router](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md). | &nbsp; |
| route | `string`  | The route template path. | &nbsp; |
| page | `string`  | The Next.js page component name. | &nbsp; |




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
| host | `string`  | The domain template string. | &nbsp; |




##### Returns


- `Object` `Null`  




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
