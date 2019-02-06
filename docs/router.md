# [next-avenues](https://github.com/samueljoos/next-avenues) *0.3.3*

> A fancy dynamic router for Next.js heavily inspired on Adonis.js and next-routes


### src/Router.js


#### new Router() 

Router is the public interface used to define
routes, groups and Link components.






##### Returns


- `Void`



#### Router.add(route, page) 

Creates a new route which resolves to a Next.js page component.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| route | `string`  | The route name. | &nbsp; |
| page | `string`  | The Next.js page component. | &nbsp; |




##### Returns


- `Route`  



#### Router.match(url, host) 

Resolves and returns the route that matches given **url** and **host**

**Note:** The first matching route will be used. So make
sure the generic routes are created after the
static routes.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| url | `string`  | Url string to find a match for. | &nbsp; |
| host | `string`  | Domain to find a match for. | &nbsp; |




##### Returns


- `Object`  



#### Router.group(callback[, name]) 

Create a group of routes.
Also see [Group](https://github.com/samueljoos/next-avenues/blob/master/docs/group.md).




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  | Callback which should only contain calls to [Router.add](https://github.com/samueljoos/next-avenues/blob/master/docs/router.md#routeraddroute-page). | &nbsp; |
| name | `string`  | Same as using [Route.as](https://github.com/samueljoos/next-avenues/blob/master/docs/group.md#asname). | *Optional* |




##### Examples

```javascript
routes.group(() => {
    routes.add('/', 'dashboard')
    // the route name will be admin.dashboard
}, 'admin')
```


##### Returns


- `Group`  



#### Router.list() 

Returns an array of all the registered routes






##### Returns


- `Array`  



#### Router.getCurrentRoute() 

Return the current active route.
This is usualy called inside the getInitialProps a Next.js page component.






##### Returns


- `Object`  



#### Router.getRequestHandler(app[, customHandler]) 

Middleware function for your nextjs server setup.




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| app | `Next.App`  | The value of Next.js next(). | &nbsp; |
| customHandler | `Function`  | Callback to customise the renderHandler parameters. | *Optional* |




##### Returns


- `Function`  



#### Router._initialize()  *private method*

Initialize the client url location data






##### Returns


-  



#### Router._validateGroupClosure(callback)  *private method*

Validates the group closure to make sure
it is a function




##### Parameters

| Name | Type | Description |  |
| ---- | ---- | ----------- | -------- |
| callback | `Function`  |  | &nbsp; |




##### Returns


- `Void`



#### Router._validateNestedGroups()  *private method*

Validates that nested groups are not created.






##### Returns


- `Void`




*Documentation generated with [doxdox](https://github.com/neogeek/doxdox).*
