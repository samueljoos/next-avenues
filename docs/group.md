# [next-avenues](https://github.com/samueljoos/next-avenues) *0.6.0*

> A fancy dynamic router for Next.js heavily inspired on Adonis.js and next-routes


### src/Group.js


#### new Group() 

Group class is used to group routes with
common behavior. For example prefixing a bunch
of routes.

An instance of group is obtained by calling the
`router.group` method on [Router](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md)
class.






##### Returns


- `Void`



#### as(name) 

Give a name to a group of routes.
This will prefix all routes name.
Also see [Route.as](https://github.com/samueljoos/next-avenues/blob/master/docs/route.md#asname)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  | Prefix for the route names seperated by a '.'. | &nbsp; |




##### Examples

```javascript
router
  .group(() => {
     router.add('/', 'dashboard').as('dashboard');
     // the route name will be admin.dashboard
  })
  .as('admin')
```


##### Returns


- `Group`  



#### prefix(prefix) 

Prefix group of routes.
Also see [Route.prefix](https://github.com/samueljoos/next-avenues/blob/master/docs/route.md#prefixprefix)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| prefix | `string`  | Prefix for the route paths. | &nbsp; |




##### Examples

```javascript
router
  .group(() => {
     router.add('/articles', 'articles').as('articles');
     // the resolved route path will be /api/v1/articles
  })
  .prefix('api/v1')
```


##### Returns


- `Group`  



#### domain(domain) 

Add domain to a group of routes.
Also see [Route.domain](https://github.com/samueljoos/next-avenues/blob/master/docs/route.md#domaindomain)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| domain | `string`  | Domain for the routes. | &nbsp; |




##### Examples

```javascript
router
  .group(() => {
     router.add('/', 'home').as('home');
     // the resolved route path will be http://next-avenues.com/
  })
  .domain('next-avenues.com')
```


##### Returns


- `Group`  



#### data(data) 

Add data to a group of routes.
Also see [Route.data](https://github.com/samueljoos/next-avenues/blob/master/docs/route.md#datadata)




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `Object`  | Data for the routes. | &nbsp; |




##### Examples

```javascript
router
  .group(() => {
     router.add('/', 'home').as('home');
     // the data object will be provided on the currentRoute object
  })
  .data({ lang: 'nl' })
```


##### Returns


- `Group`  




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
