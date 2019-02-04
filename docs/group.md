# next-avenues *0.0.1*

> Sofisticated routes for nextjs


### src/Group.js


#### new Group() 

Group class is used to group routes with
common behavior. For example prefixing a bunch
of routes.

An instance of group is obtained by calling the
`router.group` method on @ref('Router')
class.






##### Returns


- `Void`



#### as() 

Give a name to a group of routes.
This will prefix all routes name.






##### Examples

```javascript
router
  .group()
  .as('admin')
```


##### Returns


- `Void`



#### prefix(prefix) 

Prefix group of routes.
Also see @ref('Route/prefix')




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| prefix | `String`  |  | &nbsp; |




##### Examples

```javascript
router
  .group()
  .prefix('api/v1')
```


##### Returns


- `Void`



#### domain(domain) 

Add domain to a group of routes.
Also see @ref('Route/domain')




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| domain | `String`  |  | &nbsp; |




##### Examples

```javascript
router
  .group()
  .domain('blog.adonisjs.com')
```


##### Returns


- `Void`



#### data(data) 

Add data to a group of routes.
Also see @ref('Route/data')




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `String`  |  | &nbsp; |




##### Examples

```javascript
router
  .group()
  .data({ lang: nl })
```


##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
