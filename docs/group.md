# [next-avenues](https://github.com/samueljoos/next-avenues) *0.2.1*

> A fancy dynamic router for Next.js heavily inspired on Adonis.js and next-routes


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



#### as(name) 

Give a name to a group of routes.
This will prefix all routes name.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| name | `string`  |  | &nbsp; |




##### Examples

```javascript
router
  .group()
  .as('admin')
```


##### Returns


- `Group`  



#### prefix(prefix) 

Prefix group of routes.
Also see @ref('Route/prefix')




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| prefix | `string`  |  | &nbsp; |




##### Examples

```javascript
router
  .group()
  .prefix('api/v1')
```


##### Returns


- `Group`  



#### domain(domain) 

Add domain to a group of routes.
Also see @ref('Route/domain')




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| domain | `string`  |  | &nbsp; |




##### Examples

```javascript
router
  .group()
  .domain('blog.adonisjs.com')
```


##### Returns


- `Group`  



#### data(data) 

Add data to a group of routes.
Also see @ref('Route/data')




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| data | `string`  |  | &nbsp; |




##### Examples

```javascript
router
  .group()
  .data({ lang: 'nl' })
```


##### Returns


- `Group`  




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
